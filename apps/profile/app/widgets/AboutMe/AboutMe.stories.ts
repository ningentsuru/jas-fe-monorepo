import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AboutMe from './AboutMe.vue'

const meta: Meta<typeof AboutMe> = {
  component: AboutMe,
  title: 'Components/AboutMe',
}

export default meta
type Story = StoryObj<typeof AboutMe>

export const Default: Story = {
  args: {},
}
