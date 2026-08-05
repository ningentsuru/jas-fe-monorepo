import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeSpamChallenge from './MoleculeSpamChallenge.vue'

const meta: Meta<typeof MoleculeSpamChallenge> = {
  component: MoleculeSpamChallenge,
  title: 'Components/MoleculeSpamChallenge',
}

export default meta
type Story = StoryObj<typeof MoleculeSpamChallenge>

export const Default: Story = {
  args: {},
}
