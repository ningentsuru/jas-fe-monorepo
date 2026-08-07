<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { OrganismChatWindow } from '@repo/ui-vue'
import FloatingChatButton from '@/features/FloatingChatButton.vue'
import type { ChatMessage } from '@/entities/chat/model/types'
import { starterPromptsPayload } from '@/entities/profile'

const isClientReady = ref(false)
const isOpen = ref(false)
const input = ref('')
const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'streaming'>('ready')

const isLoading = computed(() => status.value === 'streaming')

function handleToggle() {
  isOpen.value = !isOpen.value
}

async function handleChatSubmit() {
  const userText = input.value.trim()
  if (!userText || isLoading.value) return

  input.value = ''
  status.value = 'streaming'

  messages.value.push({
    id: crypto.randomUUID(),
    role: 'user',
    parts: [{ type: 'text', text: userText }],
  })

  const assistantMessageId = crypto.randomUUID()
  messages.value.push({
    id: assistantMessageId,
    role: 'assistant',
    parts: [{ type: 'text', text: '' }],
  })

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.value }),
    })

    if (!response.body) throw new Error('Readable stream empty.')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    const assistantMsgIndex = messages.value.findIndex((m) => m.id === assistantMessageId)

    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue

        if (line.startsWith('0:')) {
          try {
            const token = JSON.parse(line.slice(2))

            if (assistantMsgIndex !== -1) {
              const targetMessage = messages.value[assistantMsgIndex]

              if (targetMessage && targetMessage.parts && targetMessage.parts[0]) {
                targetMessage.parts[0].text += token
              }
            }
          } catch (e) {
            console.warn('Malformed stream segment execution dropped.', e)
          }
        }
      }
    }
  } catch (error) {
    console.error('Widget Loop Error Intercepted:', error)

    if (assistantMessageId) {
      const idx = messages.value.findIndex((m) => m.id === assistantMessageId)
      if (idx !== -1) {
        const targetErrorMessage = messages.value[idx]

        if (targetErrorMessage && targetErrorMessage.parts && targetErrorMessage.parts[0]) {
          targetErrorMessage.parts[0].text = 'Network disruption detected. Please retry.'
        }
      }
    }
  } finally {
    status.value = 'ready'
  }
}

async function handleStarterPrompt(prompt: string) {
  if (isLoading.value) return

  input.value = prompt

  await nextTick()

  await handleChatSubmit()
}

onMounted(() => {
  isClientReady.value = true
})
</script>

<template>
  <div class="chat-widget-context">
    <FloatingChatButton v-if="isClientReady" :is-open="isOpen" @toggle="handleToggle" />

    <div
      v-show="isOpen"
      :class="[
        'fixed z-48 origin-bottom-right transform transition-all duration-300 ease-out',
        'top-0 left-0 h-screen w-full md:top-auto md:right-6 md:bottom-24 md:left-auto md:h-auto md:w-110 md:shadow-2xl',
        isOpen
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-95 opacity-0',
      ]"
    >
      <OrganismChatWindow
        v-model="input"
        :messages="messages"
        :is-loading="isLoading"
        :starter-prompts="starterPromptsPayload"
        @submit="handleChatSubmit"
        @select-starter="handleStarterPrompt"
      />
    </div>
  </div>
</template>
