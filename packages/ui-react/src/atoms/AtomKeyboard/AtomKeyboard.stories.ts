import type { Meta, StoryObj } from '@storybook/react-vite'
import AtomKeyboard, { type AtomKeyboardProps } from './AtomKeyboard'

const meta: Meta<typeof AtomKeyboard> = {
  title: 'Components/AtomKeyboard',
  component: AtomKeyboard,
  args: {
    character: '⌘',
  },
}

export default meta
type Story = StoryObj<AtomKeyboardProps>

export const Default: Story = {}

export const EscapeKey: Story = {
  args: {
    character: 'Esc',
  },
}

export const ArrowRightKey: Story = {
  args: {
    character: '→',
  },
}
