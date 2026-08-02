import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SimulationView from './SimulationView.vue'

const meta: Meta<typeof SimulationView> = {
  component: SimulationView,
  title: 'Components/SimulationView',
}

export default meta
type Story = StoryObj<typeof SimulationView>

export const Default: Story = {
  args: {},
}
