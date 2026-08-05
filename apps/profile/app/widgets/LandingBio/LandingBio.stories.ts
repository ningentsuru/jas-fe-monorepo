import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LandingBio from './LandingBio.vue'

const meta: Meta<typeof LandingBio> = {
  component: LandingBio,
  title: 'Components/LandingBio',
}

export default meta
type Story = StoryObj<typeof LandingBio>

export const Default: Story = {
  args: {},
}
