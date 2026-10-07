import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, generateText, type LanguageModel } from 'ai'
import {
  classifierSystemPrompt,
  compiledSystemPrompt,
  contextEducation,
  contextExperience,
  contextSkills,
} from '#entities/profile'
import type { IncomingUIMessage, OutgoingCoreMessage } from '#entities/chat'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody<{ messages: IncomingUIMessage[] }>(event)
  const config = useRuntimeConfig()

  const cleanMessages: OutgoingCoreMessage[] = messages.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: Array.isArray(msg.parts)
      ? msg.parts
          .filter((p) => p.type === 'text')
          .map((p) => p.text)
          .join('\n')
      : msg.content || '',
  }))

  const validHistory = cleanMessages.filter((m) => m.content.trim().length > 0)
  const groqKey = ((config.groqApiKey as string) || '').trim()
  const openaiKey = ((config.openaiApiKey as string) || '').trim()

  let targetModel: LanguageModel | null = null
  let finalHistory = validHistory.slice(-4)

  function setupCloudLLM(platform: 'groq' | 'openai') {
    if (platform === 'groq' && groqKey) {
      targetModel = createGroq({ apiKey: groqKey })('meta-llama/llama-prompt-guard-2-22m')
    } else if (platform === 'openai' && openaiKey) {
      targetModel = createOpenAI({ apiKey: openaiKey })('gpt-4o-mini')
    } else {
      throw new Error(`Authentication platform [${platform}] is unavailable or keys are missing.`)
    }
  }

  if (import.meta.dev) {
    try {
      const targetModelTag = 'llama3.2:latest'

      const res = await fetch('http://localhost:11434/api/tags', {
        signal: AbortSignal.timeout(1000),
      })
      const data = res.ok
        ? ((await res.json()) as { models: Array<{ name: string }> })
        : { models: [] }

      if (!data.models.some((m) => m.name === targetModelTag)) throw new Error()

      targetModel = createOpenAI({ baseURL: 'http://localhost:11434/v1', apiKey: 'ollama' })(
        targetModelTag,
      )
      finalHistory = validHistory
    } catch {
      console.log('Ollama engine verification failed, defaulting to Groq cloud...')
      setupCloudLLM('groq')
    }
  } else {
    setupCloudLLM('groq')
  }

  const latestUserQuery = finalHistory[finalHistory.length - 1]?.content || ''
  let relevantContextData = ''
  let classificationFailed = false

  if (latestUserQuery) {
    try {
      const classificationResult = await generateText({
        model: targetModel as LanguageModel,
        system: classifierSystemPrompt,
        prompt: `User Query: "${latestUserQuery}"`,
        abortSignal: AbortSignal.timeout(2500),
      })

      const categoryOutput = classificationResult.text.trim().toUpperCase()

      if (import.meta.dev) {
        console.log(
          `[Classifier Vibe Check] Query: "${latestUserQuery}" -> Match: [${categoryOutput}]`,
        )
      }

      if (categoryOutput && categoryOutput !== 'NONE') {
        if (categoryOutput.includes('EXPERIENCE')) relevantContextData += `\n\n${contextExperience}`
        if (categoryOutput.includes('SKILLS')) relevantContextData += `\n\n${contextSkills}`
        if (categoryOutput.includes('EDUCATION')) relevantContextData += `\n\n${contextEducation}`
      }
    } catch (error) {
      console.warn(
        'Classifier step failed or timed out, flagging for fallback data injection:',
        error,
      )
      classificationFailed = true
    }
  }

  if (classificationFailed) {
    relevantContextData = `\n\n${contextSkills}\n\n${contextExperience}\n\n${contextEducation}`
  }

  const dynamicSystemPrompt = `${compiledSystemPrompt}${relevantContextData}`

  let result

  try {
    result = await streamText({
      model: targetModel as LanguageModel,
      system: dynamicSystemPrompt,
      messages: finalHistory,
    })
  } catch (streamError) {
    if (!import.meta.dev && openaiKey) {
      console.warn(
        'Primary streaming provider failed. Migrating execution pipeline to OpenAI...',
        streamError,
      )

      try {
        setupCloudLLM('openai')

        result = await streamText({
          model: targetModel as LanguageModel,
          system: dynamicSystemPrompt,
          messages: finalHistory,
        })
      } catch (openaiError) {
        console.error('Both Groq and OpenAI streaming instances crashed completely.', openaiError)
        throw createError({
          statusCode: 500,
          statusMessage: 'AI Chatbot streaming core fully exhausted.',
        })
      }
    } else {
      throw streamError
    }
  }

  try {
    const rawTextStream = result.textStream
    const streamReader = rawTextStream.getReader()

    const { done, value: firstChunk } = await streamReader.read()

    if (done || !firstChunk) {
      streamReader.releaseLock()
      throw new Error('Streaming connection returned an empty token chunk payload.')
    }

    const verifiedStream = new ReadableStream({
      async start(controller) {
        const textEncoder = new TextEncoder()

        controller.enqueue(textEncoder.encode(`0:${JSON.stringify(firstChunk)}\n`))
        streamReader.releaseLock()

        const remainingReader = rawTextStream.getReader()
        try {
          while (true) {
            const { done: streamDone, value: chunk } = await remainingReader.read()
            if (streamDone) break
            controller.enqueue(textEncoder.encode(`0:${JSON.stringify(chunk)}\n`))
          }
        } catch (readError) {
          console.error('Stream transmission dropped mid-flight:', readError)
        } finally {
          remainingReader.releaseLock()
          controller.close()
        }
      },
    })

    return new Response(verifiedStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Transfer-Encoding': 'chunked',
        'x-vercel-ai-data-stream': 'v1',
      },
    })
  } catch (serializationError) {
    console.error('Interceptor blocked blank 200 response header:', serializationError)

    throw createError({
      statusCode: 500,
      statusMessage: 'AI Streaming Pipe Empty. Check model quotas or deployment variables.',
    })
  }
})
