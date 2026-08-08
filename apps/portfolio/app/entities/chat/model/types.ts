export interface MessagePart {
  type: 'text'
  text: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  parts: MessagePart[]
}
export interface IncomingUIPart {
  type: 'text'
  text: string
}

export interface IncomingUIMessage {
  role: 'user' | 'assistant' | 'system'
  parts?: IncomingUIPart[]
  content?: string
}

export interface OutgoingCoreMessage {
  role: 'user' | 'assistant'
  content: string
}
