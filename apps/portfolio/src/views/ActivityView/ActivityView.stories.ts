import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ActivityView from './ActivityView.vue'

const meta: Meta<typeof ActivityView> = {
  component: ActivityView,
  title: 'Components/ActivityView',
}

export default meta
type Story = StoryObj<typeof ActivityView>

export const Default: Story = {
  args: {},
}
