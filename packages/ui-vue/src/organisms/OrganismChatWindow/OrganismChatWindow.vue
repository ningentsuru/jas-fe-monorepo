<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Sparkles, Send } from '@lucide/vue'
import { AtomIcon, MoleculeChatBubble } from '#/index'
import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'
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
}>()

const isAllCopied = ref(false)

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
      const roleLabel = msg.role === 'user' ? 'User' : 'Assistant'

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
    class="bg-background flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-zinc-200 shadow-md dark:border-zinc-800"
  >
    <div
      class="flex-1 space-y-4 overflow-y-auto scroll-smooth p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-200 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent"
    >
      <div
        v-if="messages.length === 0"
        class="flex h-full flex-col items-center justify-center p-6 text-center"
      >
        <div
          class="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <Sparkles class="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </div>

        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Chat with Joshua's AI Assistant
        </h3>
        <p class="mt-1 mb-6 max-w-xs text-xs text-zinc-500">
          Ask me anything about his professional history, technical stack expertise, or current
          employment availability.
        </p>

        <div class="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            v-for="(prompt, pIdx) in props.starterPrompts"
            :key="pIdx"
            type="button"
            class="cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-left text-xs text-zinc-600 transition-colors duration-200 hover:bg-zinc-100/80 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-100"
            @click="handleStarterClick(prompt)"
          >
            {{ prompt }}
          </button>
        </div>
      </div>

      <template v-else>
        <MoleculeChatBubble
          v-for="(msg, index) in messages"
          :key="msg.id || index"
          :message="msg"
        />
      </template>

      <div v-if="isLoading" class="mr-auto flex max-w-[70%] flex-col gap-2">
        <Skeleton class="h-4 w-12 rounded-sm" />
        <Skeleton class="h-16 w-full rounded-lg" />
      </div>
    </div>

    <form
      @submit.prevent="emit('submit')"
      class="flex items-end gap-2 border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50"
    >
      <Textarea
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event as string)"
        @keydown="handleKeydownModifier"
        placeholder="Say something... (Enter to send, Shift+Enter for new line)"
        :disabled="isLoading"
        rows="1"
        class="bg-background max-h-[120px] min-h-[40px] flex-1 resize-none rounded-md border border-zinc-200 px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:opacity-50 dark:border-zinc-800 dark:focus-visible:ring-zinc-100"
      />

      <div class="flex items-end gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          class="bg-background h-9 cursor-pointer border border-zinc-200 px-3 text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          :disabled="messages.length === 0"
          :title="isAllCopied ? 'Transcript saved!' : 'Copy full thread conversation history'"
          @click="handleCopyEntireConversation"
        >
          <Check v-if="isAllCopied" class="h-4 w-4 text-green-500" />
          <Copy v-else class="h-4 w-4" />
        </Button>
        <Button type="submit" :disabled="isLoading || !modelValue.trim()" size="sm">
          <Send class="text-background h-4 w-4" />
        </Button>
      </div>
    </form>
  </div>
</template>
