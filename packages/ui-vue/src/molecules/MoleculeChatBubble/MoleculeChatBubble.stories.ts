import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeChatBubble from './MoleculeChatBubble.vue'

const meta: Meta<typeof MoleculeChatBubble> = {
  component: MoleculeChatBubble,
  title: 'Components/MoleculeChatBubble',
}

export default meta
type Story = StoryObj<typeof MoleculeChatBubble>

export const Default: Story = {
  args: {
    string: '',
    number: 0,
    boolean: false,
  },
}
