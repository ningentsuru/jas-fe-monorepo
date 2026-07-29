import type { Meta, StoryObj } from '@storybook/react-vite'
import { Atom } from 'lucide-react'
import AtomToggle, { type AtomToggleProps } from './AtomToggle'

const meta: Meta<typeof AtomToggle> = {
  title: 'Components/AtomToggle',
  component: AtomToggle,
  argTypes: {
    size: {
      control: { type: 'text' },
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
type Story = StoryObj<AtomToggleProps>

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
