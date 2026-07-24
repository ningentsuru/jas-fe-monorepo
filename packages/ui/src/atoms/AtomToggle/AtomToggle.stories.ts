import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomToggle from './AtomToggle.vue'
import { Atom } from '@lucide/vue'

const meta: Meta<typeof AtomToggle> = {
  component: AtomToggle,
  title: 'Components/AtomToggle',
}

export default meta
type Story = StoryObj<typeof AtomToggle>

export const Default: Story = {
  args: {
    icon: Atom,
    isToggled: false,
    size: 100,
  },
}
