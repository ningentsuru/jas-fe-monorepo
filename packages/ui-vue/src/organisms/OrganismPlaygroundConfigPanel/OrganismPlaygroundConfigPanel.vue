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
  navigator.clipboard.withText
    ? navigator.clipboard.writeText(decodeURIComponent(encodedRawText)).then(() => {
        const backupHtml = targetButton.innerHTML
        targetButton.disabled = true
        targetButton.innerText = 'Copied!'
        targetButton.classList.add('bg-emerald-600', 'text-white')
        setTimeout(() => {
          targetButton.disabled = false
          targetButton.innerHTML = backupHtml
          targetButton.classList.remove('bg-emerald-600', 'text-white')
        }, 2000)
      })
    : null
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
      return `<div class="relative my-3"><button onclick="window.runGlobalSnippetCopy(event, '${encodeURIComponent(code)}')" class="absolute top-2 right-2 px-2 py-1 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white rounded shadow cursor-pointer">Copy</button>${match}</div>`
    })
  } catch {
    return text
  }
}
</script>

<template>
  <div
    v-if="localNode"
    class="text-foreground bg-card border-border flex h-full flex-col rounded-xl border p-4"
  >
    <div class="border-border mb-4 border-b pb-2">
      <h3 class="text-foreground truncate text-sm font-bold tracking-wide uppercase">
        {{ localNode.label }}
      </h3>
      <p class="text-muted-foreground mt-0.5 font-mono text-[10px]">ID: {{ localNode.id }}</p>
    </div>

    <div class="border-border bg-muted/40 mb-4 flex rounded-md border p-0.5">
      <button
        @click="activeTab = 'settings'"
        :class="[
          'flex-1 cursor-pointer rounded py-1 text-center text-xs font-semibold transition-colors',
          activeTab === 'settings'
            ? 'bg-background text-foreground border-border/40 border shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        ]"
      >
        Settings
      </button>
      <button
        @click="activeTab = 'history'"
        :class="[
          'relative flex-1 cursor-pointer rounded py-1 text-center text-xs font-semibold transition-colors',
          activeTab === 'history'
            ? 'bg-background text-foreground border-border/40 border shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        ]"
      >
        Turn Logs
        <span
          v-if="chatHistory?.length"
          class="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold"
          >{{ chatHistory.length }}</span
        >
      </button>
    </div>

    <div v-if="activeTab === 'settings'" class="flex flex-1 flex-col gap-4 overflow-y-auto">
      <div v-if="localNode.type === 'ai'" class="flex flex-col gap-4">
        <div>
          <label
            class="text-muted-foreground mb-1 block text-[10px] font-bold tracking-wider uppercase"
            >Label</label
          >
          <Input v-model="localNode.label" @input="saveChanges" />
        </div>
        <div>
          <label
            class="text-muted-foreground mb-1 block text-[10px] font-bold tracking-wider uppercase"
            >Provider</label
          >
          <Select v-model="localNode.config.modelProvider" @update:model-value="saveChanges">
            <SelectTrigger><SelectValue placeholder="Provider" /></SelectTrigger>
            <SelectContent
              ><SelectGroup
                ><SelectItem value="groq">Groq</SelectItem
                ><SelectItem value="openai">OpenAI</SelectItem
                ><SelectItem value="ollama">Ollama</SelectItem></SelectGroup
              ></SelectContent
            >
          </Select>
        </div>
        <div>
          <label
            class="text-muted-foreground mb-1 block text-[10px] font-bold tracking-wider uppercase"
            >System Prompt</label
          >
          <Textarea
            v-model="localNode.config.systemPrompt"
            @input="saveChanges"
            rows="10"
            class="font-mono text-xs"
          />
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div>
          <label class="mb-1 block text-[10px] font-bold tracking-wider text-indigo-400 uppercase"
            >Objective Goal</label
          >
          <Textarea
            v-model="localNode.config.systemPrompt"
            @input="saveChanges"
            rows="14"
            class="font-mono text-xs"
          />
        </div>
      </div>
    </div>

    <div v-else class="flex flex-1 flex-col overflow-hidden">
      <div
        v-if="!chatHistory?.length"
        class="text-muted-foreground py-12 text-center text-xs italic"
      >
        No turns captured.
      </div>
      <div v-else class="flex flex-1 flex-col overflow-hidden">
        <Button
          size="sm"
          class="mb-3 flex w-full cursor-pointer items-center gap-1"
          @click="isModalOpen = true"
        >
          <Maximize2 class="h-3.5 w-3.5" /> Fullscreen View
        </Button>
        <div class="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          <div
            v-for="(msg, i) in chatHistory"
            :key="i"
            :class="[
              'flex flex-col gap-1 rounded-lg border p-2.5 text-xs shadow-sm',
              msg.role === 'user'
                ? 'bg-muted/30 border-border mr-2'
                : 'bg-primary/5 border-primary/20 ml-2',
            ]"
          >
            <span
              :class="[
                'text-[9px] font-extrabold tracking-widest uppercase',
                msg.role === 'user' ? 'text-indigo-500' : 'text-emerald-500',
              ]"
              >{{ msg.role === 'user' ? '📥 Input' : '📤 Output' }}</span
            >
            <div
              class="prose prose-sm dark:prose-invert text-foreground prose-p:text-muted-foreground line-clamp-5 break-words"
              v-html="compileMarkdown(msg.content)"
            />
          </div>
        </div>
      </div>
    </div>

    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
      <DialogContent class="bg-card border-border flex h-[85vh] max-w-5xl flex-col">
        <DialogHeader class="border-border border-b pb-2">
          <DialogTitle class="flex items-center gap-2 text-base font-bold tracking-wide uppercase">
            <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span
            >{{ localNode.label }} Full Audit
          </DialogTitle>
        </DialogHeader>
        <div class="bg-muted/10 flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div
            v-for="(msg, i) in chatHistory"
            :key="i"
            :class="[
              'flex w-full max-w-[90%] flex-col gap-2 rounded-xl border p-5 shadow-md',
              msg.role === 'user'
                ? 'bg-muted/40 border-border mr-auto'
                : 'bg-primary/5 border-primary/20 ml-auto',
            ]"
          >
            <div
              class="border-border text-muted-foreground flex justify-between border-b pb-1 font-mono text-[10px] font-bold uppercase"
            >
              <span>{{
                msg.role === 'user' ? '📥 Input Context Log' : '📤 Output Rendered Block'
              }}</span
              ><span>Turn #{{ i + 1 }}</span>
            </div>
            <div
              class="prose prose-sm md:prose-base dark:prose-invert text-foreground prose-p:text-muted-foreground prose-strong:text-primary prose-code:text-amber-500 prose-code:bg-zinc-950/40 prose-code:px-1 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:p-4 prose-pre:border prose-pre:border-border max-w-none leading-relaxed"
              v-html="compileMarkdown(msg.content)"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
  <div v-else class="text-muted-foreground py-12 text-center text-xs italic">
    Select any node card to configure details.
  </div>
</template>
