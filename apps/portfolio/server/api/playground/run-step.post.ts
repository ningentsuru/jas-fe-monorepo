// /server/api/playground/run-step.post.ts
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText, type LanguageModel } from 'ai'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    incomingText: string
    config: { modelProvider: string; modelName: string; systemPrompt: string }
  }>(event)

  const config = useRuntimeConfig()
  const { incomingText, config: nodeConfig } = body

  const groqKey = ((config.groqApiKey as string) || '').trim()
  const openaiKey = ((config.openaiApiKey as string) || '').trim()

  let targetModel: LanguageModel | null = null

  // 1:1 Mirror of your working index.post.ts environment resolution logic
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
    } catch (e) {
      console.log(
        'Ollama engine verification failed inside playground:',
        e instanceof Error ? e.message : e,
      )
      setupCloudLLM()
    }
  } else {
    setupCloudLLM()
  }

  function setupCloudLLM() {
    if (groqKey) {
      // Uses the model set in the node's UI config, falling back to your default
      targetModel = createGroq({ apiKey: groqKey })(
        nodeConfig.modelName || 'llama-3.3-70b-versatile',
      )
    } else if (openaiKey) {
      targetModel = createOpenAI({ apiKey: openaiKey })(nodeConfig.modelName || 'gpt-4o-mini')
    } else {
      throw new Error('All model authentication platforms exhausted inside playground.')
    }
  }

  // Execute text stream using the custom system prompt configured on the node via your UI panel
  const result = await streamText({
    model: targetModel as LanguageModel,
    system: nodeConfig.systemPrompt || 'You are an AI helpful assistant.',
    messages: [{ role: 'user', content: incomingText }],
  })

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
