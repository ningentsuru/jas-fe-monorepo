export type NodeType = 'user' | 'ai'
export type WorkflowTemplateId = 'blank' | 'agent-loop'
export interface WorkflowStep {
  targetNodeId: string
  instructionDirective: string
  sourceNodeHistoryId?: string
}
export interface PlaygroundNode {
  id: string
  type: NodeType
  label: string
  config: {
    modelProvider: 'groq' | 'openai' | 'ollama'
    modelName: string
    systemPrompt: string // Dynamic prompt editable via UI configuration panel
  }
  // Graph tracking
  position: { x: number; y: number }
}

export interface PlaygroundEdge {
  id: string
  source: string // Node ID that outputs data
  target: string // Node ID that receives data
}

// Payload sent to your backend runner
export interface PlaygroundRunPayload {
  initialPrompt: string
  executionSequence: string[] // Ordered array of Node IDs: ['user_1', 'ai_1', 'ai_2', 'user_1']
  nodes: Record<string, PlaygroundNode> // Lookup table to instantly read configurations
}

export interface WorkflowTemplate {
  id: WorkflowTemplateId
  label: string
  description: string
  nodes: PlaygroundNode[]
  edges: PlaygroundEdge[]
  executionSteps: WorkflowStep[] // NEW: Keeps the loop routing perfectly dynamic
}
