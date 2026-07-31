import type { Meta, StoryObj } from '@storybook/react-vite'
import FeatureTelegraphDashboard from './FeatureTelegraphDashboard'

const meta: Meta<typeof FeatureTelegraphDashboard> = {
  title: 'Features/FeatureTelegraphDashboard',
  component: FeatureTelegraphDashboard,
}

export default meta
type Story = StoryObj<typeof FeatureTelegraphDashboard>

export const Default: Story = {}
