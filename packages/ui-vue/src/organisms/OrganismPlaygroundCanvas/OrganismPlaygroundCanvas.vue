<!-- packages/ui-vue/src/organisms/OrganismPlaygroundCanvas/OrganismPlaygroundCanvas.vue - Part 1: Script -->
<script setup lang="ts">
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import MoleculePlaygroundUserNode from '../../molecules/MoleculePlaygroundUserNode/MoleculePlaygroundUserNode.vue'
import MoleculePlaygroundAiNode from '../../molecules/MoleculePlaygroundAiNode/MoleculePlaygroundAiNode.vue'

// Import mandatory library stylesheets inside the pure package bundle scope
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

interface PlaygroundNode {
  id: string
  type: 'user' | 'ai'
  label: string
  position: { x: number; y: number }
  config: { modelProvider: string; modelName: string; systemPrompt: string }
  data?: any
}

interface PlaygroundEdge {
  id: string
  source: string
  target: string
}

interface Props {
  nodes: PlaygroundNode[]
  edges: PlaygroundEdge[]
  processingNodeId?: string | null
  runtimeNodeHistory?: Record<string, Array<{ role: 'user' | 'assistant'; content: string }>>
}

const props = withDefaults(defineProps<Props>(), {
  processingNodeId: null,
  runtimeNodeHistory: () => ({}),
})

const emit = defineEmits<{
  'update:nodes': [updated: PlaygroundNode[]]
  'update:edges': [updated: PlaygroundEdge[]]
  'node-click': [event: any]
  'node-drag-stop': [event: any]
  'delete-node': [nodeId: string]
}>()

// Provide safe, direct compute bindings to bridge local model arrays seamlessly
const localNodes = computed({
  get: () => props.nodes,
  set: (val) => emit('update:nodes', val),
})

const localEdges = computed({
  get: () => props.edges,
  set: (val) => emit('update:edges', val),
})
</script>
<!-- packages/ui-vue/src/organisms/OrganismPlaygroundCanvas/OrganismPlaygroundCanvas.vue - Part 2: Template -->
<!-- packages/ui-vue/src/organisms/OrganismPlaygroundCanvas/OrganismPlaygroundCanvas.vue - Part 2: Template -->
<template>
  <div class="bg-background relative h-full w-full select-none">
    <!-- Natively process the active graph matrix within the presentation package -->
    <VueFlow
      v-model:nodes="localNodes"
      v-model:edges="localEdges"
      @node-click="emit('node-click', $event)"
      @node-drag-stop="emit('node-drag-stop', $event)"
      class="h-full w-full"
      :fit-view-on-init="true"
    >
      <!-- Encapsulated Slotted Trigger Node Molecule Binding -->
      <template #node-user="{ id, label, data }">
        <MoleculePlaygroundUserNode
          :id="id"
          :label="label"
          :system-prompt-text="data?.config?.systemPrompt"
          :runtime-output-text="
            runtimeNodeHistory[id] && runtimeNodeHistory[id].length > 1
              ? runtimeNodeHistory[id].slice(-1)[0]?.content
              : ''
          "
          :is-processing-active="processingNodeId === id"
        />
      </template>

      <!-- Encapsulated Slotted AI Agent Node Molecule Binding -->
      <template #node-ai="{ id, label }">
        <MoleculePlaygroundAiNode
          :id="id"
          :label="label"
          :is-master-orchestrator="id === 'master-ai'"
          :is-current-worker-active="processingNodeId === id"
          :latest-turn-response-text="
            runtimeNodeHistory[id] && runtimeNodeHistory[id].length > 0
              ? processingNodeId === id &&
                runtimeNodeHistory[id].slice(-1)[0]?.content === 'Thinking...'
                ? 'Thinking...'
                : runtimeNodeHistory[id].filter((m) => m.role === 'assistant').slice(-1)[0]
                    ?.content || ''
              : ''
          "
          @delete="emit('delete-node', $event)"
        />
      </template>
    </VueFlow>
  </div>
</template>

<!-- packages/ui-vue/src/organisms/OrganismPlaygroundCanvas/OrganismPlaygroundCanvas.vue - Part 3: Style -->
<style>
/* Automatically match line styles to your global style.css oklch variables */
.vue-flow__edge-path {
  stroke: var(--muted-foreground) !important;
  stroke-width: 2 !important;
  opacity: 0.4;
}
.vue-flow__connection-path {
  stroke: var(--primary) !important;
  stroke-width: 2 !important;
}
.vue-flow__handle {
  width: 10px !important;
  height: 10px !important;
  border-radius: calc(var(--radius) - 4px) !important;
}
</style>
