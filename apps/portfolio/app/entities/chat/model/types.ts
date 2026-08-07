export interface MessagePart {
  type: 'text'
  text: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: MessagePart[]
}
