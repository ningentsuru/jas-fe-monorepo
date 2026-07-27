import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NotFoundView from './NotFoundView.vue'

const meta: Meta<typeof NotFoundView> = {
  component: NotFoundView,
  title: 'Components/NotFoundView',
}

export default meta
type Story = StoryObj<typeof NotFoundView>

export const Default: Story = {
  args: {},
}
