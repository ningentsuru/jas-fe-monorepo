export function useApi() {
  async function sendMessage(payload: { email: string; message: string }) {
    return await $fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
  }

  return { sendMessage }
}
