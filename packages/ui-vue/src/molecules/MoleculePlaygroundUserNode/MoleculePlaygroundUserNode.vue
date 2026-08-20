<!-- /src/molecules/MoleculePlaygroundUserNode/MoleculePlaygroundUserNode.vue - Part 1: Script -->
<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

interface Props {
  id: string
  label: string
  systemPromptText?: string
  runtimeOutputText?: string
  isProcessingActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  systemPromptText: '',
  runtimeOutputText: '',
  isProcessingActive: false,
})

// Returns true if the node contains a compiled final response payload string
const hasFinalResponseOutput = computed(
  () =>
    props.runtimeOutputText &&
    props.runtimeOutputText.trim().length > 0 &&
    props.runtimeOutputText !== 'Thinking...',
)

const displayText = computed(
  () => props.runtimeOutputText || props.systemPromptText || 'Select card to input trigger text...',
)
</script>
<!-- /src/molecules/MoleculePlaygroundUserNode/MoleculePlaygroundUserNode.vue - Part 2: Template -->
<template>
  <div
    :class="[
      'group relative w-64 rounded-lg transition-all duration-300',
      isProcessingActive ? 'scale-[1.01] ring-4 ring-amber-500/20' : '',
    ]"
  >
    <!-- Left Target Input Socket -->
    <Handle
      id="target"
      :position="Position.Left"
      type="target"
      :class="[
        '!h-2.5 !w-2.5 !rounded-sm !border-none transition-colors duration-300',
        hasFinalResponseOutput ? '!bg-emerald-500' : '!bg-indigo-400',
      ]"
    />

    <Card
      :class="[
        'bg-card overflow-hidden border-2 shadow-xl transition-all duration-300',
        isProcessingActive
          ? 'border-amber-400 shadow-amber-500/5'
          : hasFinalResponseOutput
            ? 'border-emerald-500 shadow-emerald-500/5'
            : 'border-indigo-500/60 hover:border-indigo-500',
      ]"
    >
      <CardContent class="flex flex-col gap-2 p-4 text-left">
        <div class="flex items-center justify-between">
          <!-- Theme-Native Badge: Synced cleanly with your custom palette profiles -->
          <Badge
            :class="[
              'rounded-sm border px-1.5 py-0.5 text-[9px] font-extrabold tracking-widest uppercase transition-colors duration-300',
              hasFinalResponseOutput
                ? 'border-emerald-900/60 bg-emerald-950 text-emerald-400'
                : 'border-indigo-900/60 bg-indigo-950 text-indigo-400',
            ]"
          >
            {{ hasFinalResponseOutput ? '🏁 Loop Complete' : '🎯 Trigger Node' }}
          </Badge>
        </div>

        <div class="text-foreground truncate pr-1 text-sm leading-snug font-bold">
          {{ label }}
        </div>

        <!-- Text Viewport Box: Refactored with dynamic stream render checks -->
        <div
          :class="[
            'border-border max-h-40 min-h-[5rem] overflow-y-auto rounded border p-2 text-xs leading-relaxed transition-all duration-300',
            isProcessingActive ? 'bg-amber-500/5' : 'bg-muted/60',
          ]"
        >
          <!-- 1. Handle Active Processing States -->
          <div
            v-if="runtimeOutputText === 'Thinking...'"
            class="flex animate-pulse items-center gap-1.5 py-1 font-mono font-bold text-amber-500"
          >
            <span class="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-amber-500"></span>
            Compiling final review...
          </div>

          <!-- 2. Display the live data stream content -->
          <div
            v-else
            :class="[
              'whitespace-pre-wrap transition-all duration-300',
              hasFinalResponseOutput
                ? 'text-foreground/90 line-clamp-5 font-sans font-medium'
                : 'text-muted-foreground/80 line-clamp-4 font-mono italic',
            ]"
          >
            <span
              v-if="hasFinalResponseOutput"
              class="mb-1 block font-sans text-[9px] font-bold tracking-widest text-emerald-500 uppercase select-none"
            >
              Final Compiled Artifact:
            </span>
            {{ displayText }}
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Right Source Output Socket -->
    <Handle
      id="source"
      :position="Position.Right"
      type="source"
      :class="[
        '!h-2.5 !w-2.5 !rounded-sm !border-none transition-colors duration-300',
        hasFinalResponseOutput ? '!bg-emerald-500' : '!bg-indigo-400',
      ]"
    />
  </div>
</template>
