<!-- /src/molecules/MoleculePlaygroundAiNode/MoleculePlaygroundAiNode.vue - Part 1: Script -->
<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { Trash2 } from '@lucide/vue'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'

interface Props {
  id: string
  label: string
  isMasterOrchestrator?: boolean
  isCurrentWorkerActive?: boolean
  latestTurnResponseText?: string
}

const props = withDefaults(defineProps<Props>(), {
  isMasterOrchestrator: false,
  isCurrentWorkerActive: false,
  latestTurnResponseText: '',
})

const emit = defineEmits<{
  (e: 'delete', nodeId: string): void
}>()

// Computes a reactive validation state when the specific node holds an active textual message string
const hasTurnContent = computed(
  () => props.latestTurnResponseText && String(props.latestTurnResponseText).trim().length > 0,
)
</script>
<!-- /src/molecules/MoleculePlaygroundAiNode/MoleculePlaygroundAiNode.vue - Part 2: Template -->
<template>
  <div
    :class="[
      'group relative w-72 rounded-lg transition-all duration-300',
      isCurrentWorkerActive ? 'scale-[1.01] ring-4 ring-amber-500/20' : '',
    ]"
  >
    <!-- Left Interconnect Sockets -->
    <Handle
      id="target"
      :position="Position.Left"
      type="target"
      :class="[
        '!h-2.5 !w-2.5 !rounded-sm !border-none transition-colors duration-300',
        isMasterOrchestrator ? '!bg-emerald-500' : '!bg-muted-foreground',
      ]"
    />

    <Card
      :class="[
        'bg-card overflow-hidden border-2 shadow-xl transition-all duration-300',
        isCurrentWorkerActive
          ? 'border-amber-400 shadow-amber-500/5'
          : isMasterOrchestrator
            ? 'border-emerald-500 shadow-emerald-500/5'
            : 'border-border hover:border-muted-foreground/40',
      ]"
    >
      <CardContent class="flex flex-col gap-2 p-4 text-left">
        <div class="flex items-center justify-between">
          <!-- Dynamic System Badge: Swapped hardcoded themes for native layout tokens -->
          <Badge
            :class="[
              'rounded-sm border px-1.5 py-0.5 text-[9px] font-extrabold tracking-widest uppercase transition-colors duration-300',
              isMasterOrchestrator
                ? 'border-emerald-900/60 bg-emerald-950 text-emerald-400'
                : 'border-border bg-muted text-muted-foreground',
            ]"
          >
            {{ isMasterOrchestrator ? '👑 Master Core' : '🛠️ Sub-Agent Worker' }}
          </Badge>

          <!-- Hoverable Card Delete Trash Interaction Button Icon Component -->
          <Button
            v-if="!isMasterOrchestrator"
            type="button"
            variant="ghost"
            size="icon"
            class="hover:bg-destructive/10 hover:text-destructive text-muted-foreground h-6 w-6 cursor-pointer rounded-md opacity-0 transition-all group-hover:opacity-100"
            @click.stop="emit('delete', id)"
          >
            <Trash2 class="h-3.5 w-3.5" />
          </Button>
        </div>

        <div class="text-foreground mr-2 truncate text-sm font-bold tracking-tight">
          {{ label }}
        </div>

        <!-- Realtime Text Stream Render Block Section -->
        <div
          :class="[
            'border-border max-h-36 min-h-[5rem] overflow-y-auto rounded border p-2 text-xs leading-relaxed transition-all duration-300',
            isCurrentWorkerActive ? 'bg-amber-500/5' : 'bg-muted/60',
          ]"
        >
          <!-- 1. Handle Active Processing States -->
          <div
            v-if="latestTurnResponseText === 'Thinking...'"
            class="flex animate-pulse items-center gap-1.5 py-1 font-mono font-bold text-amber-500"
          >
            <span class="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-amber-500"></span>
            Processing outputs...
          </div>

          <!-- 2. Safe Optional Text Node Rendering Layout Area Frame -->
          <div
            v-else-if="hasTurnContent"
            class="text-foreground/90 line-clamp-4 font-sans font-medium whitespace-pre-wrap"
          >
            {{ latestTurnResponseText }}
          </div>

          <!-- 3. Fallback View Frame -->
          <div v-else class="text-muted-foreground/60 pt-1 font-mono text-[11px] italic">
            Awaiting graph loop call...
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Right Interconnect Sockets -->
    <Handle
      id="source"
      :position="Position.Right"
      type="source"
      :class="[
        '!h-2.5 !w-2.5 !rounded-sm !border-none transition-colors duration-300',
        isMasterOrchestrator ? '!bg-emerald-500' : '!bg-muted-foreground',
      ]"
    />
  </div>
</template>
