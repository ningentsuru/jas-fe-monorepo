import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeNavDropdown from './MoleculeNavDropdown.vue'

const meta: Meta<typeof MoleculeNavDropdown> = {
  component: MoleculeNavDropdown,
  title: 'Components/MoleculeNavDropdown',
}

export default meta
type Story = StoryObj<typeof MoleculeNavDropdown>

export const Default: Story = {
  args: {
    item: {},
    index: 0,
    isOpen: false,
  },
}
