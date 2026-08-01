import type { Meta, StoryObj } from '@storybook/react-vite'
import TelegraphSpeedControls from './TelegraphSpeedControls'

const meta: Meta = {
  title: 'Features/TelegraphSpeedControls',
  component: TelegraphSpeedControls,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    timings: {
      signalDelay: 100,
      letterBreakDelay: 400,
      wordBreakDelay: 1400,
    },
    onTimingChange: () => {},
    onApplyPreset: () => {},
  },
}
