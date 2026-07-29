import type { Meta, StoryObj } from '@storybook/react-vite'
import { Smile } from 'lucide-react'
import AtomIcon, { type AtomIconProps } from './AtomIcon'

const meta: Meta<typeof AtomIcon> = {
  title: 'Components/AtomIcon',
  component: AtomIcon,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names or a custom pixel number value',
    },
  },
  args: {
    name: 'Smile Icon',
    icon: Smile,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<AtomIconProps>

export const Default: Story = {}

export const TextFallbackState: Story = {
  args: {
    icon: undefined,
    name: 'Fallback Text',
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 48,
  },
}
