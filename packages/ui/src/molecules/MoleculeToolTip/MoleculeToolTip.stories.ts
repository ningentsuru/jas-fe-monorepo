import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeTooltip from './MoleculeTooltip.vue'

const meta: Meta<typeof MoleculeTooltip> = {
  component: MoleculeTooltip,
  title: 'Components/MoleculeTooltip',
}

export default meta
type Story = StoryObj<typeof MoleculeTooltip>

export const Default: Story = {
  args: {
    title: '',
    position: '',
    delay: 0,
  },
}
