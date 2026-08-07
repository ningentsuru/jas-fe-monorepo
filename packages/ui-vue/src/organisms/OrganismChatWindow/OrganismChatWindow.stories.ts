import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismChatWindow from './OrganismChatWindow.vue'

const meta: Meta<typeof OrganismChatWindow> = {
  component: OrganismChatWindow,
  title: 'Components/OrganismChatWindow',
}

export default meta
type Story = StoryObj<typeof OrganismChatWindow>

export const Default: Story = {
  args: {
    string: '',
    number: 0,
    boolean: false,
  },
}
