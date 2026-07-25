import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeNavAccordion from './MoleculeNavAccordion.vue'

const meta: Meta<typeof MoleculeNavAccordion> = {
  component: MoleculeNavAccordion,
  title: 'Components/MoleculeNavAccordion',
}

export default meta
type Story = StoryObj<typeof MoleculeNavAccordion>

export const Default: Story = {
  args: {
    item: {},
    isOpen: false,
  },
}
