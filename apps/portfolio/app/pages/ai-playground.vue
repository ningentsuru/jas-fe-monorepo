<!-- portfolio/app/pages/ai-playground.vue - Part 1: Script Setup -->
<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { RotateCcw, Plus } from '@lucide/vue'
import { useVueFlow, type Connection, type NodeMouseEvent } from '@vue-flow/core'

// FIXED: Using your exact working monorepo path mapping aliases
import { OrganismPlaygroundCanvas, OrganismPlaygroundConfigPanel } from '#ui'
import { WORKFLOW_TEMPLATES } from '#entities/playground-node'
import type { PlaygroundNode, PlaygroundEdge, WorkflowTemplateId } from '#entities/playground-node'

// FIXED: Bring in the direct programmatic setters and hooks required to bind interactive lines
const { getNodes, getEdges, updateNodeData, setNodes, setEdges, addEdges, onConnect } = useVueFlow()

const STORAGE_KEY = 'ai_playground_agentic_workflow_state'
const selectedTemplateId = ref<WorkflowTemplateId>('blank')

const nodes = ref<PlaygroundNode[]>([])
const edges = ref<PlaygroundEdge[]>([])
const selectedNodeId = ref<string | null>(null)
const isProcessing = ref<boolean>(false)
const processingNodeId = ref<string | null>(null)
const runtimeNodeHistory = ref<
  Record<string, Array<{ role: 'user' | 'assistant'; content: string }>>
>({})
const activePipelineAbortController = ref<AbortController>

const selectedNode = computed<PlaygroundNode | null>(
  () => nodes.value.find((n: PlaygroundNode) => n.id === selectedNodeId.value) || null,
)

// FIXED: Rewritten with a deep tick-hydration model so Vue Flow binds handles before lines
// portfolio/app/pages/ai-playground.vue - Fixed Template Loader Drag Hook

const loadWorkflowTemplate = async (templateId: WorkflowTemplateId): Promise<void> => {
  const chosenTemplate = WORKFLOW_TEMPLATES[templateId]
  if (!chosenTemplate) return

  // 1. Hard reset temporary runtime properties
  runtimeNodeHistory.value = {}
  selectedNodeId.value = null
  processingNodeId.value = null

  // 2. FIXED: Use direct atomic engine setters instead of clear out flushes to preserve DOM drag elements
  const deepCopiedNodes = JSON.parse(JSON.stringify(chosenTemplate.nodes))
  nodes.value = deepCopiedNodes
  setNodes(deepCopiedNodes)

  // 3. Keep layout ticks synchronized to preserve absolute socket bounds calculation
  await nextTick()

  const deepCopiedEdges = JSON.parse(JSON.stringify(chosenTemplate.edges))
  edges.value = deepCopiedEdges
  setEdges(deepCopiedEdges)

  saveCanvasState()
}

// Watch template select changes to hot-swap schemas dynamically
watch(selectedTemplateId, (newVal) => {
  loadWorkflowTemplate(newVal)
})

const saveCanvasState = (): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      nodes: nodes.value,
      edges: edges.value,
      selectedTemplateId: selectedTemplateId.value,
    }),
  )
}

// portfolio/app/pages/ai-playground.vue - Fixed Node Drag Append Hook

const createAiNode = (): void => {
  const newId = `ai-${Date.now()}`
  const count = nodes.value.filter((n) => n.type === 'ai').length + 1

  const freshNode: PlaygroundNode = {
    id: newId,
    type: 'ai',
    label: `AI Agent Custom #${count}`,
    position: { x: 400 + count * 20, y: 200 + count * 20 },
    data: {
      config: {
        modelProvider: 'groq',
        modelName: 'llama-3.3-70b-versatile',
        systemPrompt: 'You are a helpful co-pilot analyzing incoming payloads.',
      },
    },
    config: {
      modelProvider: 'groq',
      modelName: 'llama-3.3-70b-versatile',
      systemPrompt: 'You are a helpful co-pilot analyzing incoming payloads.',
    },
  }

  // FIXED: Push and feed entire updated structure to retain layout event tracking
  nodes.value.push(freshNode)
  setNodes(JSON.parse(JSON.stringify(nodes.value)))

  selectedNodeId.value = newId
  saveCanvasState()
}

const deleteNode = (nodeId: string): void => {
  if (nodeId === 'user-1') return
  nodes.value = nodes.value.filter((n: PlaygroundNode) => n.id !== nodeId)
  edges.value = edges.value.filter(
    (e: PlaygroundEdge) => e.source !== nodeId && e.target !== nodeId,
  )

  setNodes([...nodes.value])
  setEdges([...edges.value])

  if (runtimeNodeHistory.value[nodeId]) delete runtimeNodeHistory.value[nodeId]
  if (selectedNodeId.value === nodeId) selectedNodeId.value = null
  saveCanvasState()
}

const resetCanvasLayout = (): void => {
  loadWorkflowTemplate(selectedTemplateId.value)
}

const handleNodeUpdate = (updatedNode: PlaygroundNode): void => {
  const index = nodes.value.findIndex((n: PlaygroundNode) => n.id === updatedNode.id)
  if (index !== -1) {
    nodes.value[index] = updatedNode
    updateNodeData(updatedNode.id, { config: { ...updatedNode.config } })
    saveCanvasState()
  }
}

// FIXED: Capture user manual dragging connections and bind them securely across local state trackers
onConnect((params: Connection) => {
  if (!params.source || !params.target) return

  // Update internal canvas layout state machine engines
  addEdges([params])

  // Synchronize local tracking arrays for pipeline sequence tracers to read safely
  edges.value.push({
    id: `e-${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
  })

  saveCanvasState()
})

const onNodeClick = (event: NodeMouseEvent): void => {
  selectedNodeId.value = event.node.id
}

// portfolio/app/pages/ai-playground.vue - Script Part 3 (Fully Dynamic Logic)

const executeIndividualNodeStream = async (
  targetNodeId: string,
  fullContextText: string,
  nodeConfig: any,
): Promise<string> => {
  processingNodeId.value = targetNodeId
  if (!runtimeNodeHistory.value[targetNodeId]) runtimeNodeHistory.value[targetNodeId] = []
  runtimeNodeHistory.value[targetNodeId].push({
    role: 'user',
    content: `Incoming Context Pass:\n\n${fullContextText}`,
  })

  const absoluteIndex = runtimeNodeHistory.value[targetNodeId].length
  runtimeNodeHistory.value[targetNodeId].push({ role: 'assistant', content: 'Thinking...' })

  try {
    const response = await fetch('/api/playground/run-step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ incomingText: fullContextText, config: nodeConfig }),
      signal: activePipelineAbortController.value?.signal,
    })
    if (!response.body) throw new Error('Unreadable stream engine collection error.')
    runtimeNodeHistory.value[targetNodeId][absoluteIndex].content = ''
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let leftoverBuffer = ''
    let totalTextAccumulated = ''

    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      leftoverBuffer += decoder.decode(value, { stream: true })
      const lines = leftoverBuffer.split('\n')
      leftoverBuffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.trim() || !line.startsWith('0:')) continue
        try {
          const clearToken = JSON.parse(line.slice(2)) as string
          runtimeNodeHistory.value[targetNodeId][absoluteIndex].content += clearToken
          totalTextAccumulated += clearToken
        } catch {
          continue
        }
      }
    }
    return totalTextAccumulated
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      runtimeNodeHistory.value[targetNodeId][absoluteIndex].content =
        '[Execution Loop Interrupted by User]'
      throw err
    }
    const errMsg = `[Error]: ${err instanceof Error ? err.message : String(err)}`
    runtimeNodeHistory.value[targetNodeId][absoluteIndex].content = errMsg
    return errMsg
  }
}

const runPlaygroundPipeline = async (): Promise<void> => {
  if (isProcessing.value) {
    if (activePipelineAbortController.value) activePipelineAbortController.value.abort()
    return
  }

  isProcessing.value = true
  activePipelineAbortController.value = new AbortController()

  const activeNodes = getNodes.value
  const activeEdges = getEdges.value

  const userRootNode = activeNodes.find((n: any) => n.id === 'user-1')
  const userStartingPrompt =
    userRootNode?.data?.config?.systemPrompt || userRootNode?.config?.systemPrompt || ''
  runtimeNodeHistory.value = { 'user-1': [{ role: 'user', content: userStartingPrompt }] }

  const activeTemplate = WORKFLOW_TEMPLATES[selectedTemplateId.value]

  try {
    // APPROACH A: If the loaded blueprint has a predefined execution steps array, execute it dynamically
    if (activeTemplate && activeTemplate.executionSteps?.length > 0) {
      let masterAccumulatedContext = `Initial User Goal: "${userStartingPrompt}"\n\n`

      for (const step of activeTemplate.executionSteps) {
        const currentNode = activeNodes.find((n: any) => n.id === step.targetNodeId)
        if (!currentNode) continue

        const nodeConfig = currentNode.data?.config || currentNode.config

        // Unpack additional context from previous steps if required by the data token config
        let stepInputPayload = masterAccumulatedContext
        if (step.sourceNodeHistoryId && runtimeNodeHistory.value[step.sourceNodeHistoryId]) {
          const sourceLogs = runtimeNodeHistory.value[step.sourceNodeHistoryId]
          const lastOutput =
            sourceLogs.filter((m) => m.role === 'assistant').slice(-1)[0]?.content || ''
          stepInputPayload = `Previous Source Feedback:\n${lastOutput}\n\nCombined Loop History Context:\n${masterAccumulatedContext}`
        }

        const output = await executeIndividualNodeStream(
          step.targetNodeId,
          `${stepInputPayload}\n\n[System Directive Instructions]: ${step.instructionDirective}`,
          nodeConfig,
        )

        masterAccumulatedContext = `[Turn Update from ${currentNode.label || step.targetNodeId}]:\n${output}\n\n${masterAccumulatedContext}`
      }

      // Flush final context output right back to the User Trigger element frame
      runtimeNodeHistory.value['user-1'].push({
        role: 'assistant',
        content: masterAccumulatedContext,
      })
    } else {
      // APPROACH B: Fallback Strategy for Fresh/Blank Canvas - Trace straight topological cable handle lines linearly
      let currentId = 'user-1'
      let runningPayloadText = userStartingPrompt
      const visited = new Set<string>([currentId])

      for (let i = 0; i < 12; i++) {
        const nextEdge = activeEdges.find((e: any) => e.source === currentId)
        if (!nextEdge) break

        currentId = nextEdge.target
        if (currentId === 'user-1' || visited.has(currentId)) break
        visited.add(currentId)

        const currentNode = activeNodes.find((n: any) => n.id === currentId)
        if (!currentNode || currentNode.type === 'user') continue

        const nodeConfig = currentNode.data?.config || currentNode.config
        runningPayloadText = await executeIndividualNodeStream(
          currentId,
          runningPayloadText,
          nodeConfig,
        )
      }
      runtimeNodeHistory.value['user-1'].push({ role: 'assistant', content: runningPayloadText })
    }
  } catch (pipelineErr) {
    console.log('Dynamic sequence execution halted cleanly.')
  } finally {
    processingNodeId.value = null
    isProcessing.value = false
    activePipelineAbortController.value = null
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const rawCache = localStorage.getItem(STORAGE_KEY)
  if (rawCache) {
    try {
      const parsed = JSON.parse(rawCache)
      selectedTemplateId.value = parsed.selectedTemplateId || 'blank'
      nodes.value =
        parsed.nodes ||
        JSON.parse(JSON.stringify(WORKFLOW_TEMPLATES[selectedTemplateId.value].nodes))
      edges.value =
        parsed.edges ||
        JSON.parse(JSON.stringify(WORKFLOW_TEMPLATES[selectedTemplateId.value].edges))
      setNodes([...nodes.value])
      setEdges([...edges.value])
    } catch {
      resetCanvasLayout()
    }
  } else {
    resetCanvasLayout()
  }
})
</script>

<!-- portfolio/app/pages/ai-playground.vue - Part 3: Template Layout Header -->
<!-- portfolio/app/pages/ai-playground.vue - Complete Theme-Synced Template -->
<template>
  <div class="bg-background text-foreground flex h-screen w-full overflow-hidden font-sans">
    <div class="relative flex h-full flex-1 flex-col">
      <!-- Header row fully styled to adapt with OKLCH theme layout channels -->
      <header
        class="border-border bg-card/50 z-10 flex items-center justify-between border-b p-4 backdrop-blur-sm"
      >
        <div>
          <h1 class="text-foreground text-lg font-bold tracking-tight">AI Loop Workspace</h1>
          <p class="text-muted-foreground text-xs">
            Observe multi-agent reasoning handoffs built via shared package organisms.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Template selector drop menu matching your style.css layout rules -->
          <div
            class="bg-background border-border flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs shadow-sm"
          >
            <span class="text-muted-foreground font-semibold">Workflow Blueprint:</span>
            <select
              v-model="selectedTemplateId"
              class="text-foreground cursor-pointer border-none bg-transparent pr-4 font-bold focus:ring-0 focus:outline-none"
            >
              <option value="blank" class="bg-card text-foreground">Fresh Canvas (Default)</option>
              <option value="agent-loop" class="bg-card text-foreground">
                Multi-Turn Master/Sub Loop
              </option>
            </select>
          </div>

          <button
            @click="resetCanvasLayout"
            class="bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-medium shadow-sm transition-all"
          >
            <RotateCcw class="h-4 w-4" />Reset Blueprint
          </button>

          <button
            @click="createAiNode"
            class="bg-background border-border hover:bg-muted text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 rounded border px-3 py-1.5 text-sm font-medium shadow-sm transition-all"
          >
            <Plus class="text-primary h-4 w-4" />Add Agent
          </button>

          <button
            @click="runPlaygroundPipeline"
            :class="[
              'cursor-pointer rounded px-5 py-2 text-sm font-bold tracking-wide shadow-lg transition-all',
              isProcessing
                ? 'bg-destructive text-destructive-foreground animate-duration-1000 animate-pulse hover:opacity-90'
                : 'bg-primary text-primary-foreground hover:opacity-90',
            ]"
          >
            {{ isProcessing ? 'Stop Execution' : 'Execute Loop Workflow' }}
          </button>
        </div>
      </header>

      <!-- FIXED: Swapped hardcoded bg-slate-950 to adapt seamlessly to your active OKLCH background -->
      <div class="bg-background h-full w-full flex-1">
        <ClientOnly>
          <OrganismPlaygroundCanvas
            v-model:nodes="nodes"
            v-model:edges="edges"
            :processing-node-id="processingNodeId"
            :runtime-node-history="runtimeNodeHistory"
            @node-click="onNodeClick"
            @node-drag-stop="saveCanvasState"
            @delete-node="deleteNode"
          />
          <template #fallback>
            <div
              class="text-muted-foreground bg-background flex h-full w-full animate-pulse items-center justify-center font-mono text-xs"
            >
              Hydrating shared canvas...
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Sidebar container synced perfectly with theme panel properties -->
    <aside class="border-border bg-card h-full w-80 border-l p-0 backdrop-blur-md">
      <OrganismPlaygroundConfigPanel
        :selected-node="selectedNode"
        :chat-history="selectedNodeId ? runtimeNodeHistory[selectedNodeId] : []"
        @update-node="handleNodeUpdate"
      />
    </aside>
  </div>
</template>

<style scoped>
/* Scoped overrides to lock down page boundaries cleanly */
</style>
