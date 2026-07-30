import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AbouteMeView from './AboutMeView.vue'

const meta: Meta<typeof AbouteMeView> = {
  component: AbouteMeView,
  title: 'Components/AbouteMeView',
}

export default meta
type Story = StoryObj<typeof AbouteMeView>

export const Default: Story = {
  args: {},
}
