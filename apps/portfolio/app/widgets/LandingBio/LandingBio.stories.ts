import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LandingBio from './LandingBio.vue'

const meta: Meta<typeof LandingBio> = {
  title: 'Widgets/LandingBio',
  component: LandingBio,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LandingBio>

export const Default: Story = {}
