import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomKeyboard from './AtomKeyboard.vue'

const meta: Meta<typeof AtomKeyboard> = {
  component: AtomKeyboard,
  title: 'Components/AtomKeyboard',
}

export default meta
type Story = StoryObj<typeof AtomKeyboard>

export const Default: Story = {
  args: {
    character: '',
  },
}
