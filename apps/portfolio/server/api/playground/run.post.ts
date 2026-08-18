import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type LanguageModel } from 'ai'
import type { PlaygroundRunPayload } from '#entities/playground-node'

export default defineEventHandler(async (event) => {
  const { initialPrompt, executionSequence, nodes } = await readBody<PlaygroundRunPayload>(event)
  const config = useRuntimeConfig()

  const groqKey = ((config.groqApiKey as string) || '').trim()
  const openaiKey = ((config.openaiApiKey as string) || '').trim()

  // Track the conversational baton passed between nodes
  let runningTextPayload = initialPrompt
  const stepLogs: Array<{ nodeId: string; label: string; output: string }> = []

  // Skip the first element if it's the User Node starting point
  for (let i = 0; i < executionSequence.length; i++) {
    const nodeId = executionSequence[i]
    const currentNode = nodes[nodeId]

    if (!currentNode) continue
    if (currentNode.type === 'user') {
      // If loop routes back to user, capture final pass and output
      if (i > 0) {
        stepLogs.push({ nodeId, label: currentNode.label, output: runningTextPayload })
      }
      continue
    }

    // Resolve Language Model for current Node Configuration
    let modelInstance: LanguageModel
    if (currentNode.config.modelProvider === 'groq' && groqKey) {
      modelInstance = createGroq({ apiKey: groqKey })(
        currentNode.config.modelName || 'llama-3.3-70b-versatile',
      )
    } else if (currentNode.config.modelProvider === 'ollama') {
      modelInstance = createOpenAI({ baseURL: 'http://localhost:11434/v1', apiKey: 'ollama' })(
        currentNode.config.modelName || 'llama3.2:latest',
      )
    } else {
      modelInstance = createOpenAI({ apiKey: openaiKey })(
        currentNode.config.modelName || 'gpt-4o-mini',
      )
    }

    // Execute generation using the current node's system prompt
    const { text } = await generateText({
      model: modelInstance,
      system: currentNode.config.systemPrompt,
      messages: [{ role: 'user', content: runningTextPayload }],
    })

    // Update running payload context for next connected node
    runningTextPayload = text
    stepLogs.push({ nodeId, label: currentNode.label, output: text })
  }

  return { success: true, steps: stepLogs, finalOutput: runningTextPayload }
})
