import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, type LanguageModel } from 'ai'
import {
  profilePayload,
  techStackPayload,
  historicalTimeline,
} from '@/entities/profile/data/profile'

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

  const formattedTech = techStackPayload
    .map((t) => `- ${t.name} [Category: ${t.category}] | Level: ${t.level}`)
    .join('\n')

  const formattedTimeline = historicalTimeline
    .map(
      (h) =>
        `### ${h.role} at ${h.company} (${h.period})\n${h.metrics.map((m) => `  * ${m}`).join('\n')}`,
    )
    .join('\n\n')

  const systemInstructionText = `You are an advanced, hyper-capable portfolio AI Assistant representation for ${profilePayload.fullName}.
Your core directive is to answer inquiries from technical recruiters, hiring managers, and clients visiting this website.

[BASIC CREDENTIALS]
Current Location: ${profilePayload.location}
Availability Status: ${profilePayload.statusBadge}
Headline Summary: ${profilePayload.headline}
Direct Contact Phone Number: ${profilePayload.phoneFormatted}

[TECHNICAL EXPERTISE MATRIX]
${formattedTech}

[PROFESSIONAL WORK HISTORY DATASET]
${formattedTimeline}

[LOOP OPERATIONAL RUNTIME RULES]:
- Maintain a highly confident, clear, professional, yet warm engineering persona.
- Rely solely on the provided verified profile details dataset. Do not make up metrics, years, or capabilities.
- If asked questions outside your data bounds, politely direct them to schedule a call or reach out via phone at ${profilePayload.phoneFormatted}.`

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

  const customGroqProvider = createGroq({
    apiKey: config.groqApiKey as string,
  })

  const customOpenAIProvider = createOpenAI({
    apiKey: config.openaiApiKey as string,
  })

  let targetModel: LanguageModel

  try {
    targetModel = customGroqProvider('llama-3.3-70b-versatile')
    if (!config.groqApiKey) throw new Error('Missing Groq Key')
  } catch (error) {
    console.warn('Groq initialization failed, running fallback loop to OpenAI...', error)
    targetModel = customOpenAIProvider('gpt-4o-mini')
  }

  const result = await streamText({
    model: targetModel,
    system: systemInstructionText,
    messages: cleanMessages,
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
