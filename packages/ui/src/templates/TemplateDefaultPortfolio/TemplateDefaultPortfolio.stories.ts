import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateDefaultPortfolio from './TemplateDefaultPortfolio.vue'

const meta: Meta<typeof TemplateDefaultPortfolio> = {
  component: TemplateDefaultPortfolio,
  title: 'Components/TemplateDefaultPortfolio',
}

export default meta
type Story = StoryObj<typeof TemplateDefaultPortfolio>

export const Default: Story = {
  args: {},
}

export const SlotContent: Story = {
  args: {
    default: 'Hello!',
  },
}
