import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismHero from './OrganismHero.vue'

const meta: Meta<typeof OrganismHero> = {
  component: OrganismHero,
  title: 'Components/OrganismHero',
}

export default meta
type Story = StoryObj<typeof OrganismHero>

export const Default: Story = {
  args: {
    title: '',
  },
}
