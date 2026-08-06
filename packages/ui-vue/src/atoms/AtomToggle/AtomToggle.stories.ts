import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Atom } from '@lucide/vue'
import AtomToggle from './AtomToggle.vue'

const meta: Meta<typeof AtomToggle> = {
  title: 'Atoms/AtomToggle',
  component: AtomToggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
      description: 'Accepts preset name strings or custom pixel layout numbers',
    },
    isToggled: {
      control: 'boolean',
      description: 'Controls active visual state appearance',
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
