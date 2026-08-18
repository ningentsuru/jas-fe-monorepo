<!-- /packages/ui-vue/src/organisms/OrganismPlaygroundConfigPanel/OrganismPlaygroundConfigPanel.vue - Part 1: Script -->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'
import { Maximize2, X } from '@lucide/vue'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'

interface PlaygroundNode {
  id: string
  type: 'user' | 'ai'
  label: string
  config: { modelProvider: string; modelName: string; systemPrompt: string }
  data?: any
}

const props = defineProps<{
  selectedNode: PlaygroundNode | null
  chatHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
}>()

const emit = defineEmits<{
  (e: 'updateNode', updated: PlaygroundNode): void
}>()

const localNode = ref<PlaygroundNode | null>(null)
const activeTab = ref<'settings' | 'history'>('settings')
const isModalOpen = ref<boolean>(false)

watch(
  () => props.selectedNode,
  (newVal) => {
    if (newVal) {
      localNode.value = JSON.parse(JSON.stringify(newVal))
      if (!localNode.value.data) localNode.value.data = {}
      if (!localNode.value.data.config) localNode.value.data.config = { ...localNode.value.config }
    } else {
      localNode.value = null
      isModalOpen.value = false
    }
  },
  { immediate: true },
)

const saveChanges = () => {
  if (localNode.value) {
    if (localNode.value.config) localNode.value.data.config = { ...localNode.value.config }
    emit('updateNode', localNode.value)
  }
}

const runGlobalSnippetCopy = (event: Event, encodedRawText: string): void => {
  const targetButton = event.currentTarget as HTMLButtonElement
  if (!targetButton || targetButton.disabled) return
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(decodeURIComponent(encodedRawText)).then(() => {
      const backupHtml = targetButton.innerHTML
      targetButton.disabled = true
      targetButton.innerText = 'Copied!'
      targetButton.classList.add('!bg-emerald-600', '!text-white', '!border-emerald-500')
      setTimeout(() => {
        targetButton.disabled = false
        targetButton.innerHTML = backupHtml
        targetButton.classList.remove('!bg-emerald-600', '!text-white', '!border-emerald-500')
      }, 2000)
    })
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') (window as any).runGlobalSnippetCopy = runGlobalSnippetCopy
})
onUnmounted(() => {
  if (typeof window !== 'undefined') delete (window as any).runGlobalSnippetCopy
})

marked.setOptions({ breaks: true, gfm: true })

const compileMarkdown = (text: string): string => {
  if (!text) return ''
  try {
    const html = marked.parse(text, { async: false }) as string
    return html.replace(/<pre>([\s\S]*?)<\/pre>/g, (match) => {
      const code = match
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      return `
        <div class="relative group/code-block my-3">
          <button 
            onclick="window.runGlobalSnippetCopy(event, '${encodeURIComponent(code)}')" 
            class="absolute top-2 right-2 px-2 py-1 bg-background/80 border border-border text-[10px] text-muted-foreground hover:text-foreground rounded shadow transition-all cursor-pointer backdrop-blur-sm select-none"
          >
            Copy
          </button>
          ${match}
        </div>
      `
    })
  } catch {
    return text
  }
}
</script>
<!-- /packages/ui-vue/src/organisms/OrganismPlaygroundConfigPanel/OrganismPlaygroundConfigPanel.vue - Part 2: Template -->
<template>
  <div
    v-if="localNode"
    class="text-foreground bg-card border-border flex h-full flex-col rounded-xl border p-4"
  >
    <!-- Component Top Header Meta Data Layer -->
    <div class="border-border mb-4 border-b pb-2">
      <h3 class="text-foreground truncate text-sm font-bold tracking-wide uppercase">
        {{ localNode.label }}
      </h3>
      <p class="text-muted-foreground mt-0.5 font-mono text-[10px]">
        ID Ref Token: {{ localNode.id }}
      </p>
    </div>

    <!-- Universal Design System Tab Selector Switcher Row -->
    <div class="border-border bg-muted/40 mb-4 flex rounded-md border p-0.5">
      <button
        @click="activeTab = 'settings'"
        :class="[
          'flex-1 cursor-pointer rounded py-1.5 text-center text-xs font-semibold transition-colors',
          activeTab === 'settings'
            ? 'bg-background text-foreground border-border/40 border font-bold shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        ]"
      >
        Settings
      </button>
      <button
        @click="activeTab = 'history'"
        :class="[
          'relative flex-1 cursor-pointer rounded py-1.5 text-center text-xs font-semibold transition-colors',
          activeTab === 'history'
            ? 'bg-background text-foreground border-border/40 border font-bold shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        ]"
      >
        Turn Logs
        <span
          v-if="chatHistory?.length"
          class="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold shadow-sm"
        >
          {{ chatHistory.length }}
        </span>
      </button>
    </div>

    <!-- TAB PANEL SUB VIEW A: PARAMETER IDENTITY CONFIG FORM -->
    <div v-if="activeTab === 'settings'" class="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
      <div v-if="localNode.type === 'ai'" class="flex flex-col gap-4">
        <div>
          <label
            class="text-muted-foreground mb-1.5 block text-[10px] font-bold tracking-wider uppercase"
            >Agent Configuration Label</label
          >
          <Input
            v-model="localNode.label"
            @input="saveChanges"
            class="bg-background border-border text-foreground focus-visible:ring-ring"
          />
        </div>
        <div>
          <label
            class="text-muted-foreground mb-1.5 block text-[10px] font-bold tracking-wider uppercase"
            >Model Engine Provider</label
          >
          <Select v-model="localNode.config.modelProvider" @update:model-value="saveChanges">
            <SelectTrigger class="bg-background border-border text-foreground focus:ring-ring"
              ><SelectValue placeholder="Select Provider"
            /></SelectTrigger>
            <SelectContent class="bg-card border-border text-foreground">
              <SelectGroup>
                <SelectItem value="groq" class="focus:bg-muted focus:text-foreground"
                  >Groq</SelectItem
                >
                <SelectItem value="openai" class="focus:bg-muted focus:text-foreground"
                  >OpenAI</SelectItem
                >
                <SelectItem value="ollama" class="focus:bg-muted focus:text-foreground"
                  >Ollama (Local Dev)</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            class="text-muted-foreground mb-1.5 block text-[10px] font-bold tracking-wider uppercase"
            >System Prompt Identity Persona</label
          >
          <Textarea
            v-model="localNode.config.systemPrompt"
            @input="saveChanges"
            rows="12"
            class="bg-background border-border text-foreground focus-visible:ring-ring font-mono text-xs leading-relaxed"
            placeholder="Instruct this specific node how to think or behave when parsing incoming variables..."
          />
        </div>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div>
          <label class="text-primary mb-1.5 block text-[10px] font-bold tracking-wider uppercase"
            >Trigger Baseline Payload Message</label
          >
          <Textarea
            v-model="localNode.config.systemPrompt"
            @input="saveChanges"
            rows="15"
            class="bg-background border-border text-foreground focus-visible:ring-ring font-mono text-xs leading-relaxed"
            placeholder="Type your starter application text prompt execution sequence here..."
          />
        </div>
      </div>
    </div>

    <!-- TAB PANEL SUB VIEW B: ACCUMULATED SIMULATION STEP PASS LOGGER -->
    <div v-else class="flex flex-1 flex-col overflow-hidden">
      <div
        v-if="!chatHistory?.length"
        class="text-muted-foreground py-12 text-center text-xs italic"
      >
        No active brain loops recorded for this node yet. Hit execute to track context transitions.
      </div>
      <div v-else class="flex flex-1 flex-col overflow-hidden">
        <Button
          size="sm"
          class="bg-primary text-primary-foreground mb-3 flex w-full cursor-pointer items-center gap-1.5 font-bold shadow-sm transition-opacity hover:opacity-90"
          @click="isModalOpen = true"
        >
          <Maximize2 class="h-3.5 w-3.5" /> Fullscreen Audit Logs
        </Button>

        <div class="flex max-h-[65vh] flex-1 flex-col gap-3 overflow-y-auto pr-1">
          <div
            v-for="(msg, i) in chatHistory"
            :key="i"
            :class="[
              'flex flex-col gap-1.5 rounded-lg border p-3 text-xs leading-relaxed shadow-sm transition-all duration-200',
              msg.role === 'user'
                ? 'bg-muted/40 border-border mr-2'
                : 'bg-primary/5 border-primary/20 ml-2',
            ]"
          >
            <span
              :class="[
                'text-[9px] font-extrabold tracking-widest uppercase',
                msg.role === 'user' ? 'text-indigo-500' : 'text-emerald-500',
              ]"
            >
              {{ msg.role === 'user' ? '📥 Context Input' : '📤 Output Sent' }}
            </span>
            <div
              class="prose prose-sm dark:prose-invert text-foreground prose-p:text-muted-foreground prose-p:leading-normal prose-strong:text-foreground prose-code:text-primary line-clamp-5 max-w-none break-words"
              v-html="compileMarkdown(msg.content)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- FULL-SCREEN AUDIT CONVERSATION WORKSPACE OVERLAY SHEET -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
      <DialogContent
        class="bg-card border-border text-foreground flex h-[85vh] max-w-6xl flex-col rounded-xl shadow-2xl"
      >
        <DialogHeader
          class="border-border flex flex-row items-center justify-between border-b pb-3"
        >
          <div>
            <DialogTitle
              class="text-foreground flex items-center gap-2 text-base font-bold tracking-wide uppercase"
            >
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
              {{ localNode.label }} Simulation Feed History
            </DialogTitle>
            <p class="text-muted-foreground mt-0.5 font-sans text-xs font-normal">
              Comprehensive chronological breakdown of technical text packets passed across this
              agent slot instance.
            </p>
          </div>
        </DialogHeader>

        <div
          class="bg-background/30 border-border/10 flex flex-1 flex-col gap-6 overflow-y-auto border-t p-6 md:p-8"
        >
          <div
            v-for="(msg, i) in chatHistory"
            :key="i"
            :class="[
              'flex w-full max-w-[85%] flex-col gap-3 rounded-xl border p-5 shadow-md transition-all duration-200',
              msg.role === 'user'
                ? 'bg-muted/40 border-border mr-auto'
                : 'bg-primary/5 border-primary/20 ml-auto',
            ]"
          >
            <div
              class="border-border/60 text-muted-foreground flex justify-between border-b pb-1.5 font-mono text-[10px] font-bold tracking-wider uppercase"
            >
              <span>{{
                msg.role === 'user'
                  ? '📥 Context Block Input Packets'
                  : '📤 Generated Response Chunk'
              }}</span>
              <span>Turn pass index #{{ i + 1 }}</span>
            </div>
            <div
              class="prose prose-sm md:prose-base dark:prose-invert text-foreground prose-p:text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-strong:text-primary prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-pre:bg-background prose-pre:p-4 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:font-mono prose-pre:text-foreground max-w-none leading-relaxed"
              v-html="compileMarkdown(msg.content)"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  <div
    v-else
    class="text-muted-foreground bg-card border-border flex h-full items-center justify-center rounded-xl border py-12 text-center text-xs italic"
  >
    Select any workspace node card node to balance parameter configurations.
  </div>
</template>
<!-- /packages/ui-vue/src/organisms/OrganismPlaygroundConfigPanel/OrganismPlaygroundConfigPanel.vue - Part 3: Style -->
<style scoped>
/* Sync any global scroll constraints cleanly without clashing layout boundaries */
.config-panel {
  width: 100%;
}
</style>
