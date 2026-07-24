import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeModal from './MoleculeModal.vue'

const meta: Meta<typeof MoleculeModal> = {
  component: MoleculeModal,
  title: 'Components/MoleculeModal',
}

export default meta
type Story = StoryObj<typeof MoleculeModal>

export const Default: Story = {
  args: {
    title: '',
  },
}
