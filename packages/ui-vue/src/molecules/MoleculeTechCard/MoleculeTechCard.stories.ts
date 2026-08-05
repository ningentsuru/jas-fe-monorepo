import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeTechCard from './MoleculeTechCard.vue'

const meta: Meta<typeof MoleculeTechCard> = {
  component: MoleculeTechCard,
  title: 'Components/MoleculeTechCard',
}

export default meta
type Story = StoryObj<typeof MoleculeTechCard>

export const Default: Story = {
  args: {},
}
