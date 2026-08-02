import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeCard from './MoleculeCard.vue'

const meta: Meta<typeof MoleculeCard> = {
  component: MoleculeCard,
  title: 'Components/MoleculeCard',
}

export default meta
type Story = StoryObj<typeof MoleculeCard>

export const Default: Story = {
  args: {},
}
