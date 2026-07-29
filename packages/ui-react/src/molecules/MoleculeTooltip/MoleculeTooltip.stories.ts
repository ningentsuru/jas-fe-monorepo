import type { Meta, StoryObj } from '@storybook/react-vite'
import MoleculeTooltip, { type MoleculeTooltipProps } from './MoleculeTooltip'

const meta: Meta<typeof MoleculeTooltip> = {
  title: 'Components/MoleculeTooltip',
  component: MoleculeTooltip,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    title: 'Tax Information Override',
    position: 'top',
    delay: 200,
  },
}

export default meta
type Story = StoryObj<MoleculeTooltipProps>

export const Default: Story = {}

export const PositionBottom: Story = {
  args: {
    position: 'bottom',
    title: 'Bottom Placement Tooltip',
  },
}

export const PositionLeft: Story = {
  args: {
    position: 'left',
    title: 'Left Placement Tooltip',
  },
}

export const FastDelay: Story = {
  args: {
    delay: 50,
    title: 'Fast Action Delay Tooltip',
  },
}
