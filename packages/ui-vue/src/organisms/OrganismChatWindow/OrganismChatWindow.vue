<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Copy, Check, Sparkles, Send } from '@lucide/vue'
import { MoleculeChatBubble } from '#/index'
import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'

interface Props {
  messages: any[]
  isLoading: boolean
  modelValue: string
  starterPrompts: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
  (e: 'select-starter', prompt: string): void
  (e: 'delete-message', targetIdOrIndex: string | number): void
}>()

const isAllCopied = ref(false)
const scrollViewport = ref<HTMLDivElement | null>(null)

const executeScrollToBottom = async () => {
  await nextTick()
  if (scrollViewport.value) {
    scrollViewport.value.scrollTop = scrollViewport.value.scrollHeight
  }
}

watch(
  () => props.messages,
  () => {
    executeScrollToBottom()
  },
  { deep: true, immediate: true },
)

const handleKeydownModifier = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (props.modelValue.trim() && !props.isLoading) {
      emit('submit')
    }
  }
}

const handleStarterClick = (prompt: string) => {
  if (props.isLoading) return
  emit('select-starter', prompt)
}

const handleCopyEntireConversation = async () => {
  if (props.messages.length === 0 || isAllCopied.value) return

  const formattedTranscript = props.messages
    .map((msg: any) => {
      const roleLabel = msg.role === 'user' ? 'You' : "Joshua's AI Assistant"
      const contentText =
        msg.parts && Array.isArray(msg.parts)
          ? msg.parts
              .filter((p: any) => p.type === 'text' && p.text)
              .map((p: any) => p.text)
              .join('\n')
          : msg.content || ''

      return `[${roleLabel}]\n${contentText}`
    })
    .join('\n\n───────────────────────────────────────\n\n')

  try {
    await navigator.clipboard.writeText(formattedTranscript)
    isAllCopied.value = true
    setTimeout(() => {
      isAllCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Transcript clipboard write sequence failed:', error)
  }
}
</script>

<template>
  <div
    class="bg-background border-border bg-opacity-95 fixed top-0 left-0 z-49 flex h-dvh w-full flex-col overflow-hidden p-0 transition-all duration-300 ease-in-out md:relative md:top-auto md:left-auto md:z-0 md:h-[600px] md:max-w-2xl md:rounded-xl md:border md:shadow-md"
  >
    <div
      class="border-border bg-muted/10 flex items-center justify-between border-b px-4 py-3 md:hidden"
    >
      <div class="flex items-center gap-2">
        <Sparkles class="text-foreground h-4 w-4 animate-pulse" />
        <span class="text-foreground text-xs font-semibold tracking-tight">
          AI Assistant Window
        </span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
        <span class="text-muted-foreground font-mono text-[10px] font-medium uppercase">Ready</span>
      </div>
    </div>

    <div
      ref="scrollViewport"
      class="[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 dark:[&::-webkit-scrollbar-thumb]:bg-border dark:hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 flex-1 space-y-4 overflow-y-auto scroll-smooth p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
    >
      <div v-if="messages.length > 0" class="flex flex-col gap-1">
        <MoleculeChatBubble
          v-for="(msg, index) in messages"
          :key="msg.id || index"
          :message="msg"
          @delete="emit('delete-message', msg.id || index)"
        />
      </div>

      <div
        v-if="messages.length <= 1 && !isLoading"
        class="border-border bg-muted/20 animate-fadeIn mt-4 space-y-2.5 rounded-xl border p-3"
      >
        <p
          class="text-muted-foreground px-1 font-mono text-[10px] font-semibold tracking-wider uppercase"
        >
          Suggested Starter Inquiries
        </p>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            v-for="(prompt, pIdx) in props.starterPrompts"
            :key="pIdx"
            type="button"
            class="border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-lg border p-2.5 text-left text-xs font-medium shadow-sm transition-all duration-200 active:scale-95"
            @click="handleStarterClick(prompt)"
          >
            🚀 {{ prompt }}
          </button>
        </div>
      </div>
    </div>

    <form
      @submit.prevent="emit('submit')"
      class="border-border bg-muted/20 pb-safe-bottom flex flex-col gap-2 border-t p-4 md:pb-4"
    >
      <div class="flex w-full items-end gap-2">
        <div class="relative flex min-w-0 flex-1 flex-col">
          <Textarea
            :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event as string)"
            @keydown="handleKeydownModifier"
            placeholder="Say something... (Enter to send, Shift+Enter for new line)"
            :disabled="isLoading"
            rows="1"
            maxlength="150"
            class="bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring max-h-[140px] min-h-[44px] w-full resize-none rounded-md border px-3 py-2.5 pb-6 text-sm break-all focus-visible:ring-1 focus-visible:ring-offset-0 disabled:opacity-50"
          />

          <span
            :class="[
              'absolute right-2 bottom-1 text-[10px] tracking-wide transition-colors duration-150 select-none',
              modelValue.length >= 150
                ? 'text-destructive animate-pulse font-mono font-semibold'
                : 'text-muted-foreground/60 font-mono',
            ]"
          >
            {{ modelValue.length }}/150
          </span>
        </div>

        <div class="flex h-11 items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            class="bg-background border-input text-muted-foreground hover:text-foreground h-10 cursor-pointer border px-3 transition-all duration-200 active:scale-95"
            :disabled="messages.length === 0"
            :title="isAllCopied ? 'Transcript saved!' : 'Copy full thread conversation history'"
            @click="handleCopyEntireConversation"
          >
            <Check v-if="isAllCopied" class="h-4 w-4 text-green-500" />
            <Copy v-else class="h-4 w-4" />
          </Button>

          <Button
            type="submit"
            :disabled="isLoading || !modelValue.trim() || modelValue.length > 150"
            size="sm"
            class="h-10 px-4 transition-all duration-200 active:scale-95"
          >
            <Send class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
