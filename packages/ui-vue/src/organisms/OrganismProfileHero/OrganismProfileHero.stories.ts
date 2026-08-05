import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismProfileHero from './OrganismProfileHero.vue'

const meta: Meta<typeof OrganismProfileHero> = {
  component: OrganismProfileHero,
  title: 'Components/OrganismProfileHero',
}

export default meta
type Story = StoryObj<typeof OrganismProfileHero>

export const Default: Story = {
  args: {},
}
