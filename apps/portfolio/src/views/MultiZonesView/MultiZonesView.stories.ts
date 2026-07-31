import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MultiZonesView from './MultiZonesView.vue'

const meta: Meta<typeof MultiZonesView> = {
  component: MultiZonesView,
  title: 'Components/MultiZonesView',
}

export default meta
type Story = StoryObj<typeof MultiZonesView>

export const Default: Story = {
  args: {},
}
