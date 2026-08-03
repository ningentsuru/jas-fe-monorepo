import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FeatureSimulatePurchase from './FeatureSimulatePurchase.vue'

const meta: Meta<typeof FeatureSimulatePurchase> = {
  component: FeatureSimulatePurchase,
  title: 'Components/FeatureSimulatePurchase',
}

export default meta
type Story = StoryObj<typeof FeatureSimulatePurchase>

export const Default: Story = {
  args: {},
}
