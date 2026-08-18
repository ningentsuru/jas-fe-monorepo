// /app/entities/playground-node/data/templates.ts
import type { WorkflowTemplate, WorkflowTemplateId } from '../model/types'

export const WORKFLOW_TEMPLATES: Record<WorkflowTemplateId, WorkflowTemplate> = {
  blank: {
    id: 'blank',
    label: 'Fresh Canvas (Default)',
    description: 'A completely clean starting point with only your initial trigger input.',
    nodes: [
      {
        id: 'user-1',
        type: 'user',
        label: 'User Trigger',
        position: { x: 100, y: 220 },
        data: {
          config: {
            modelProvider: 'openai',
            modelName: 'input',
            systemPrompt: 'Type your clean prompt objective here...',
          },
        },
        config: {
          modelProvider: 'openai',
          modelName: 'input',
          systemPrompt: 'Type your clean prompt objective here...',
        },
      },
    ],
    edges: [],
    executionSteps: [], // Fresh canvas relies on manual nodes additions and lacks macro step runs
  },
  'agent-loop': {
    id: 'agent-loop',
    label: 'Multi-Turn Master/Sub Loop',
    description:
      'Advanced autonomous agentic flow: User ➔ Master ➔ 3 Sub-agents ➔ Master review loop cycle.',
    nodes: [
      {
        id: 'user-1',
        type: 'user',
        label: 'User Trigger',
        position: { x: 0, y: 0 },
        data: {
          config: {
            modelProvider: 'ollama',
            modelName: 'input',
            systemPrompt: 'Build a Next.js ecommerce page detailing performance metrics.',
          },
        },
        config: {
          modelProvider: 'ollama',
          modelName: 'input',
          systemPrompt: 'Build a Next.js ecommerce page detailing performance metrics.',
        },
      },
      {
        id: 'master-ai',
        type: 'ai',
        label: 'Master Orchestrator',
        position: { x: 300, y: 0 },
        data: {
          config: {
            modelProvider: 'ollama',
            modelName: 'llama-3.3-70b-versatile',
            systemPrompt:
              'You are the Master AI manager. Coordinate work across Sub-agents. Look at incoming requests, delegate tasks one by one, and compile the final review.',
          },
        },
        config: {
          modelProvider: 'ollama',
          modelName: 'llama-3.3-70b-versatile',
          systemPrompt:
            'You are the Master AI manager. Coordinate work across Sub-agents. Look at incoming requests, delegate tasks one by one, and compile the final review.',
        },
      },
      {
        id: 'sub-1',
        type: 'ai',
        label: 'Sub AI 1 (Research)',
        position: { x: 650, y: -250 },
        data: {
          config: {
            modelProvider: 'ollama',
            modelName: 'llama-3.3-70b-versatile',
            systemPrompt:
              'You are Sub AI 1 (Research). Take instructions from Master AI, extract technical trends, performance data, and specs.',
          },
        },
        config: {
          modelProvider: 'ollama',
          modelName: 'llama-3.3-70b-versatile',
          systemPrompt:
            'You are Sub AI 1 (Research). Take instructions from Master AI, extract technical trends, performance data, and specs.',
        },
      },
      {
        id: 'sub-2',
        type: 'ai',
        label: 'Sub AI 2 (Analysis/Code)',
        position: { x: 650, y: 0 },
        data: {
          config: {
            modelProvider: 'openai',
            modelName: 'gpt-4o-mini',
            systemPrompt:
              'You are Sub AI 2 (Analysis/Code). Take research logs from Master AI, design optimization code structures and layout schemas.',
          },
        },
        config: {
          modelProvider: 'openai',
          modelName: 'gpt-4o-mini',
          systemPrompt:
            'You are Sub AI 2 (Analysis/Code). Design optimization code structures and layout schemas.',
        },
      },
      {
        id: 'sub-3',
        type: 'ai',
        label: 'Sub AI 3 (Writing/Polish)',
        position: { x: 650, y: 250 },
        data: {
          config: {
            modelProvider: 'groq',
            modelName: 'llama-3.3-70b-versatile',
            systemPrompt:
              'You are Sub AI 3 (Writing/Polish). Take structures from Master AI, clean up markdown layout phrasing, and format output documents.',
          },
        },
        config: {
          modelProvider: 'groq',
          modelName: 'llama-3.3-70b-versatile',
          systemPrompt:
            'You are Sub AI 3 (Writing/Polish). Take structures from Master AI, clean up markdown layout phrasing, and format output documents.',
        },
      },
    ],
    edges: [
      { id: 'e-user-master', source: 'user-1', target: 'master-ai' },
      { id: 'e-master-sub1', source: 'master-ai', target: 'sub-1' },
      { id: 'e-sub1-master', source: 'sub-1', target: 'master-ai' },
      { id: 'e-master-sub2', source: 'master-ai', target: 'sub-2' },
      { id: 'e-sub2-master', source: 'sub-2', target: 'master-ai' },
      { id: 'e-master-sub3', source: 'master-ai', target: 'sub-3' },
      { id: 'e-sub3-master', source: 'sub-3', target: 'master-ai' },
      { id: 'e-master-user', source: 'master-ai', target: 'user-1' },
    ],
    // DYNAMIC FIXED: Instructions completely extracted out of scripts and placed into structural step fields
    executionSteps: [
      {
        targetNodeId: 'master-ai',
        instructionDirective:
          'Analyze the initial user goals and provide explicit instructions for Sub AI 1 (Research).',
      },
      {
        targetNodeId: 'sub-1',
        instructionDirective: 'Process your research instructions based on the Master AI commands.',
        sourceNodeHistoryId: 'master-ai',
      },
      {
        targetNodeId: 'master-ai',
        instructionDirective:
          'Review Sub 1 Research data metrics. Next, pass optimized instructions to Sub AI 2 (Analysis/Code) to construct architectural models or functional algorithms.',
        sourceNodeHistoryId: 'sub-1',
      },
      {
        targetNodeId: 'sub-2',
        instructionDirective:
          'Process your analysis and coding layouts based on the updated Master AI context commands.',
        sourceNodeHistoryId: 'master-ai',
      },
      {
        targetNodeId: 'master-ai',
        instructionDirective:
          'Review Sub 2 architectural analysis. Next, dispatch specific formatting commands to Sub AI 3 (Writing/Polish) to write clean, polished documentation models.',
        sourceNodeHistoryId: 'sub-2',
      },
      {
        targetNodeId: 'sub-3',
        instructionDirective:
          'Clean up the markdown typography phrasing, documentation components, and polish final layout details based on Master commands.',
        sourceNodeHistoryId: 'master-ai',
      },
      {
        targetNodeId: 'master-ai',
        instructionDirective:
          '[CRITICAL FINAL DIRECTIVE - STOP WORKFLOW]: All sub-agent tasks are complete. DO NOT delegate tasks to any new sub-agents. DO NOT invent a 4th Sub AI. Compile all collective work above from Sub 1, 2, and 3, and output the complete production-ready final report artifact overview back to the user right now.',
        sourceNodeHistoryId: 'sub-3',
      },
    ],
  },
}
