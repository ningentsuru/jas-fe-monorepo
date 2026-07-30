import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HisCvView from './CvView.vue'

const meta: Meta<typeof HisCvView> = {
  component: HisCvView,
  title: 'Components/HisCvView',
}

export default meta
type Story = StoryObj<typeof HisCvView>

export const Default: Story = {
  args: {},
}
