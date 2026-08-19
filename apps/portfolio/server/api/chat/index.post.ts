import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, generateText, toTextStream, type LanguageModel } from 'ai'
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
  let classifierModel: LanguageModel | null = null
  let finalHistory = validHistory.slice(-4)

  function getModelInstance(platform: 'groq' | 'openai') {
    if (platform === 'groq' && groqKey) {
      return createGroq({ apiKey: groqKey })('llama-3.3-70b-versatile')
    } else if (platform === 'openai' && openaiKey) {
      return createOpenAI({ apiKey: openaiKey })('gpt-4o-mini')
    }
    throw new Error(`Authentication platform [${platform}] keys are missing.`)
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

      const ollamaProvider = createOpenAI({
        baseURL: 'http://localhost:11434/v1',
        apiKey: 'ollama',
      })
      targetModel = ollamaProvider(targetModelTag)
      classifierModel = ollamaProvider(targetModelTag)
      finalHistory = validHistory
    } catch (e) {
      console.log('Ollama verification failed, using Groq dev fallback...')
      targetModel = getModelInstance('groq')
      classifierModel = getModelInstance('groq')
    }
  } else {
    targetModel = getModelInstance('groq')
    classifierModel = getModelInstance('groq')
  }

  const latestUserQuery = finalHistory[finalHistory.length - 1]?.content || ''
  let relevantContextData = ''
  let classificationFailed = false

  if (latestUserQuery) {
    try {
      const classificationResult = await generateText({
        model: classifierModel as LanguageModel,
        system: classifierSystemPrompt,
        prompt: `User Query: "${latestUserQuery}"`,
        abortSignal: AbortSignal.timeout(2000),
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
      console.warn('Classifier step failed, shifting to full fallback:', error)
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
      console.warn('Primary streaming provider failed. Switching live to OpenAI...', streamError)
      targetModel = getModelInstance('openai')

      result = await streamText({
        model: targetModel as LanguageModel,
        system: dynamicSystemPrompt,
        messages: finalHistory,
      })
    } else {
      throw streamError
    }
  }

  if (import.meta.dev) {
    const textEncoder = new TextEncoder()
    const protocolStream = result.textStream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(textEncoder.encode(`0:${JSON.stringify(chunk)}\n`))
        },
      }),
    )

    return new Response(protocolStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Transfer-Encoding': 'chunked',
        'x-vercel-ai-data-stream': 'v1',
      },
    })
  }

  const nodeResponse = event.node.res

  nodeResponse.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Transfer-Encoding': 'chunked',
    'x-vercel-ai-data-stream': 'v1',
  })

  const dataStream = toTextStream(result)
  const reader = dataStream.getReader()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    nodeResponse.write(value)
  }

  nodeResponse.end()
})
