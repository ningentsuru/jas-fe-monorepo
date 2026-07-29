import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Atom } from '@lucide/vue'
import AtomToggle from './AtomToggle.vue'

const meta: Meta<typeof AtomToggle> = {
  title: 'Components/AtomToggle',
  component: AtomToggle,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names or a custom pixel number value',
    },
  },
  args: {
    icon: Atom,
    isToggled: false,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof AtomToggle>

export const Default: Story = {}

export const ToggledActive: Story = {
  args: {
    isToggled: true,
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 48,
  },
}
