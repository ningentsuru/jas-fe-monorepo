import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismChatWindow from './OrganismChatWindow.vue'

const meta: Meta<typeof OrganismChatWindow> = {
  component: OrganismChatWindow,
  title: 'Organisms/OrganismChatWindow',
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object', description: 'Active history log payload matrix.' },
    isLoading: { control: 'boolean', description: 'State indicator tracker for streaming loops.' },
    modelValue: { control: 'text', description: 'Internal textarea form string value.' },
    starterPrompts: { control: 'object', description: 'Onboarding suggestion string arrays.' },
  },
}

export default meta
type Story = StoryObj<typeof OrganismChatWindow>

const baseStarterPrompts = [
  "What is Joshua's primary tech stack?",
  'Tell me about his experience with Nuxt 4.',
  'Is he available for new opportunities?',
  'Where was his most recent engineering role?',
]

export const EmptyOnboardingState: Story = {
  args: {
    messages: [],
    isLoading: false,
    modelValue: '',
    starterPrompts: baseStarterPrompts,
  },
}

export const ActiveConversationState: Story = {
  args: {
    messages: [
      {
        id: 'user-1',
        role: 'user',
        parts: [{ type: 'text', text: 'Tell me about your Nuxt experience.' }],
      },
      {
        id: 'ai-1',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Joshua has managed **8 production repos** running Vue/Nuxt configurations successfully!',
          },
        ],
      },
    ],
    isLoading: false,
    modelValue: 'Incredible! What about cloud tools?',
    starterPrompts: baseStarterPrompts,
  },
}

export const StreamingLoadingState: Story = {
  args: {
    messages: [
      {
        id: 'user-2',
        role: 'user',
        parts: [{ type: 'text', text: 'Are you open to remote opportunities?' }],
      },
    ],
    isLoading: true,
    modelValue: '',
    starterPrompts: baseStarterPrompts,
  },
}
