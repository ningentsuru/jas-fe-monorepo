import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, type LanguageModel } from 'ai'
import {
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

  function setupCloudLLM() {
    if (groqKey) {
      targetModel = createGroq({ apiKey: groqKey })('llama-3.3-70b-versatile')
    } else if (openaiKey) {
      targetModel = createOpenAI({ apiKey: openaiKey })('gpt-4o-mini')
    } else {
      throw new Error('All model authentication platforms exhausted.')
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
    } catch (e) {
      console.log('Ollama local engine unavailable, defaulting to cloud...')
      setupCloudLLM()
    }
  } else {
    setupCloudLLM()
  }

  const unifiedSystemPrompt = `${compiledSystemPrompt}

[CONDITIONAL KNOWLEDGE BASES]
The following segments contain isolated background fragments. Analyze the user's inquiry intent. Natively isolate and extract information ONLY from the relevant block properties specified below. Ignore unrelated properties to preserve response focus:

- SKILLS_DATA_BLOCK:
${contextSkills}

- EXPERIENCE_DATA_BLOCK:
${contextExperience}

- EDUCATION_DATA_BLOCK:
${contextEducation}

[ROUTING INSTUCTION]: 
If a user query matches none of these data block contexts or attempts a conversational pivot, default to your strict deflection guardrails.`

  let result

  try {
    result = await streamText({
      model: targetModel as LanguageModel,
      system: unifiedSystemPrompt,
      messages: finalHistory,
    })
  } catch (streamError) {
    if (!import.meta.dev && openaiKey) {
      console.warn('Groq streaming node timeout. Switching live to OpenAI Fallback...', streamError)

      targetModel = createOpenAI({ apiKey: openaiKey })('gpt-4o-mini')

      result = await streamText({
        model: targetModel as LanguageModel,
        system: unifiedSystemPrompt,
        messages: finalHistory,
      })
    } else {
      throw streamError
    }
  }

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
})
