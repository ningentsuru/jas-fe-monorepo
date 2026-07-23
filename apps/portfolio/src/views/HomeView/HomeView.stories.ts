import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HomeView from './HomeView.vue'

const meta: Meta<typeof HomeView> = {
  component: HomeView,
  title: 'Components/HomeView',
}

export default meta
type Story = StoryObj<typeof HomeView>

export const Default: Story = {
  args: {},
}
