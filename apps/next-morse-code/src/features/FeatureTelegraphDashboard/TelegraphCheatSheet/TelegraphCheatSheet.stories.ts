import type { Meta, StoryObj } from '@storybook/react-vite'
import TelegraphCheatSheet from './TelegraphCheatSheet'

const meta: Meta = {
  title: 'Features/TelegraphCheatSheet',
  component: TelegraphCheatSheet,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    morseDictionary: {
      '.-': 'A',
      '-...': 'B',
      '-.-.': 'C',
    },
  },
}
