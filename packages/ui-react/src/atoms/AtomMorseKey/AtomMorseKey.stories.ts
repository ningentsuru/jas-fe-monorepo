import type { Meta, StoryObj } from '@storybook/react-vite'
import AtomMorseKey, { type AtomMorseKeyProps } from './AtomMorseKey'

const meta: Meta<typeof AtomMorseKey> = {
  title: 'Components/AtomMorseKey',
  component: AtomMorseKey,
  argTypes: {
    onDot: { action: 'dot-captured' },
    onDash: { action: 'dash-captured' },
  },
  args: {
    label: 'SIGNAL',
    signalDelay: 250,
  },
}

export default meta
type Story = StoryObj<AtomMorseKeyProps>

export const Default: Story = {}

export const StrictHighSpeed: Story = {
  args: {
    label: 'EXPERT',
    signalDelay: 150,
  },
}
