import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HomeHero from './HomeHero.vue'

const meta: Meta<typeof HomeHero> = {
  component: HomeHero,
  title: 'Components/HomeHero',
}

export default meta
type Story = StoryObj<typeof HomeHero>

export const Default: Story = {
  args: {},
}
