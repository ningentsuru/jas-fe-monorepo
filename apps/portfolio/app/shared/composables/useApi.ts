import type { ChatMessage } from '@/entities/chat/model/types'

export function useApi() {
  async function sendMessage(payload: { email: string; message: string }) {
    return await $fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
  }

  async function chatAi(payload: { messages: ChatMessage[] }) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP network error encountered: ${response.status}`)
    }

    return response
  }

  return { sendMessage, chatAi }
}
