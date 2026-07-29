import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomKeyboard from './AtomKeyboard'

const meta: Meta<typeof AtomKeyboard> = {
  title: 'Components/AtomKeyboard',
  component: AtomKeyboard,
  args: {
    character: '⌘',
  },
}

export default meta
type Story = StoryObj<typeof AtomKeyboard>

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
