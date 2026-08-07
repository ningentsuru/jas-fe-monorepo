import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, type LanguageModel } from 'ai'
import { compiledSystemPromptText } from '@/entities/profile/data/profile'

interface IncomingUIPart {
  type: 'text'
  text: string
}

interface IncomingUIMessage {
  role: 'user' | 'assistant' | 'system'
  parts?: IncomingUIPart[]
  content?: string
}

interface OutgoingCoreMessage {
  role: 'user' | 'assistant'
  content: string
}

export default defineEventHandler(async (event) => {
  const { messages } = await readBody<{ messages: IncomingUIMessage[] }>(event)
  const config = useRuntimeConfig()

  const cleanMessages: OutgoingCoreMessage[] = messages.map(
    (msg: IncomingUIMessage): OutgoingCoreMessage => {
      let textContent = ''
      if (msg.parts && Array.isArray(msg.parts)) {
        textContent = msg.parts
          .filter((part: IncomingUIPart): boolean => part.type === 'text')
          .map((part: IncomingUIPart): string => part.text)
          .join('\n')
      } else {
        textContent = msg.content || ''
      }
      return {
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: textContent,
      }
    },
  )

  const optimizedHistory = cleanMessages.filter((m) => m.content.trim().length > 0).slice(-4)

  const groqKey = ((config.groqApiKey as string) || process.env.NUXT_GROQ_API_KEY || '').trim()
  const openaiKey = (
    (config.openaiApiKey as string) ||
    process.env.NUXT_OPENAI_API_KEY ||
    ''
  ).trim()

  let targetModel: LanguageModel

  if (groqKey) {
    try {
      const customGroqProvider = createGroq({ apiKey: groqKey })
      targetModel = customGroqProvider('llama-3.3-70b-versatile')
    } catch (error) {
      if (!openaiKey) throw new Error('Groq initialization failed and no OpenAI key was supplied.')
      const customOpenAIProvider = createOpenAI({ apiKey: openaiKey })
      targetModel = customOpenAIProvider('gpt-4o-mini')
    }
  } else if (openaiKey) {
    const customOpenAIProvider = createOpenAI({ apiKey: openaiKey })
    targetModel = customOpenAIProvider('gpt-4o-mini')
  } else {
    throw new Error('All authentication platforms exhausted. Environment keys missing.')
  }

  const result = await streamText({
    model: targetModel,
    system: compiledSystemPromptText,
    messages: optimizedHistory,
  })

  const textEncoder = new TextEncoder()
  const transformer = new TransformStream({
    transform(chunk, controller) {
      const formattedChunk = `0:${JSON.stringify(chunk)}\n`
      controller.enqueue(textEncoder.encode(formattedChunk))
    },
  })

  const protocolStream = result.textStream.pipeThrough(transformer)

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
