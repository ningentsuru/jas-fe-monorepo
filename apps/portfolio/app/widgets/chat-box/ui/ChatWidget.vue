<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useApi } from '@/composables/useApi'
import { useRoute } from 'vue-router'
import { FloatingChatButton } from '#features/floating-chat'
import { OrganismChatWindow } from '#ui'
import { starterPromptsPayload } from '#entities/profile'
import type { ChatMessage } from '#entities/chat'

const { chatAi } = useApi()
const route = useRoute()

const isClientReady = ref(false)
const isOpen = ref(false)
const input = ref('')
const messages = ref<ChatMessage[]>([])
const status = ref<'ready' | 'streaming'>('ready')

const isLoading = computed(() => status.value === 'streaming')
const STORAGE_KEY = 'jas_portfolio_chat_timeline'

function handleToggle() {
  isOpen.value = !isOpen.value
}

function unlockBody() {
  if (import.meta.client) {
    document.body.classList.remove('overflow-hidden')
  }
}

function updateScrollLock(shouldLock: boolean) {
  if (!import.meta.client) return

  if (shouldLock && window.innerWidth < 768) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
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
    const response = await chatAi({ messages: messages.value })

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

function handleDeleteTargetMessage(targetIdOrIndex: string | number) {
  const localTargetArray = [...messages.value]

  if (typeof targetIdOrIndex === 'string') {
    const targetIdx = localTargetArray.findIndex((m) => m.id === targetIdOrIndex)
    if (targetIdx !== -1) {
      localTargetArray.splice(targetIdx, 1)
    }
  } else if (typeof targetIdOrIndex === 'number') {
    localTargetArray.splice(targetIdOrIndex, 1)
  }

  messages.value = localTargetArray
}

async function handleStarterPrompt(prompt: string) {
  if (isLoading.value) return

  input.value = prompt
  await nextTick()
  await handleChatSubmit()
}

watch(isOpen, (newVal) => {
  updateScrollLock(newVal)
})

watch(
  () => route.path,
  () => {
    isOpen.value = false
    unlockBody()
  },
)

function handleResize() {
  updateScrollLock(isOpen.value)
}

watch(
  messages,
  (newMessages) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages))
    } catch (error) {
      console.error('Failed to sync chat timeline matrix data token to storage context:', error)
    }
  },
  { deep: true },
)

onMounted(() => {
  isClientReady.value = true

  window.addEventListener('resize', handleResize)

  try {
    const historicalCache = localStorage.getItem(STORAGE_KEY)

    if (historicalCache) {
      messages.value = JSON.parse(historicalCache)
    } else {
      messages.value = [
        {
          id: 'welcome-system-node',
          role: 'assistant',
          parts: [
            {
              type: 'text',
              text: "Hello! I am Joshua's autonomous AI proxy agent. I have direct access to his verified technical stack matrix, professional history dataset, and employment credentials. Feel free to type an inquiry or select one of the quick starter actions below to audit his capabilities in real time.",
            },
          ],
        },
      ]
    }
  } catch (error) {
    console.warn('Hydration tracking intercepted storage bypass:', error)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
    unlockBody()
  }
})
</script>

<template>
  <div class="chat-widget-context">
    <FloatingChatButton v-if="isClientReady" :is-open="isOpen" @toggle="handleToggle" />

    <div
      :class="[
        'fixed z-48 flex origin-bottom-right flex-col transition-all duration-300 ease-out',
        'top-0 left-0 h-dvh w-screen md:top-auto md:right-6 md:bottom-24 md:left-auto md:h-150 md:max-w-lg',
        isOpen
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-95 opacity-0',
      ]"
    >
      <OrganismChatWindow
        v-model="input"
        :messages="messages"
        :is-loading="isLoading"
        :starter-prompts="starterPromptsPayload"
        @submit="handleChatSubmit"
        @delete-message="handleDeleteTargetMessage"
        @select-starter="handleStarterPrompt"
      />
    </div>
  </div>
</template>
