import type { Meta, StoryObj } from '@storybook/react-vite'
import FeatureTelegraphDashboard from './FeatureTelegraphDashboard'

const meta: Meta = {
  title: 'Features/FeatureTelegraphDashboard',
  component: FeatureTelegraphDashboard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
