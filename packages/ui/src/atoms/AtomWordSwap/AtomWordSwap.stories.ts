import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomWordSwap from './AtomWordSwap.vue'

const meta: Meta<typeof AtomWordSwap> = {
  component: AtomWordSwap,
  title: 'Components/AtomWordSwap',
}

export default meta
type Story = StoryObj<typeof AtomWordSwap>

export const Default: Story = {
  args: {
    word: '',
  },
}
