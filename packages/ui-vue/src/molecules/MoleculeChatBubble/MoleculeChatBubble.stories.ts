import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeChatBubble from './MoleculeChatBubble.vue'

const meta: Meta<typeof MoleculeChatBubble> = {
  component: MoleculeChatBubble,
  title: 'Molecules/MoleculeChatBubble',
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'object',
      description: 'The sanitized message data object payload matching FSD chat constraints.',
    },
  },
}

export default meta
type Story = StoryObj<typeof MoleculeChatBubble>

export const UserMessage: Story = {
  args: {
    message: {
      role: 'user',
      parts: [
        { type: 'text', text: "Hello! Can you summarize Joshua Sardido's expertise in Nuxt 4?" },
      ],
    },
  },
}

export const AssistantMessage: Story = {
  args: {
    message: {
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Joshua is a **Frontend Specialist** skilled in Vue 3 and Nuxt 4. Contact him at [ja.sardido@outlook.com](mailto:ja.sardido@outlook.com).',
        },
      ],
    },
  },
}
