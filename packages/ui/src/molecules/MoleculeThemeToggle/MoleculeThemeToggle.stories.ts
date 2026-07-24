import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeThemeToggle from './MoleculeThemeToggle.vue'

const meta: Meta<typeof MoleculeThemeToggle> = {
  component: MoleculeThemeToggle,
  title: 'Components/MoleculeThemeToggle',
}

export default meta
type Story = StoryObj<typeof MoleculeThemeToggle>

export const Default: Story = {
  args: {
    isToggled: false,
    size: '',
  },
}
