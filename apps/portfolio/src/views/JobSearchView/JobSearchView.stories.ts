import type { Meta, StoryObj } from '@storybook/vue3-vite'
import JobSearchView from './JobSearchView.vue'

const meta: Meta<typeof JobSearchView> = {
  component: JobSearchView,
  title: 'Components/JobSearchView',
}

export default meta
type Story = StoryObj<typeof JobSearchView>

export const Default: Story = {
  args: {},
}
