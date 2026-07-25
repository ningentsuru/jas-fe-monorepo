import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AboutThisMonorepoView from './AboutThisMonorepoView.vue'

const meta: Meta<typeof AboutThisMonorepoView> = {
  component: AboutThisMonorepoView,
  title: 'Components/AboutThisMonorepoView',
}

export default meta
type Story = StoryObj<typeof AboutThisMonorepoView>

export const Default: Story = {
  args: {},
}
