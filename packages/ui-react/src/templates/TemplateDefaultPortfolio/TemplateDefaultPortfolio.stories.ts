import type { Meta, StoryObj } from '@storybook/react-vite'
import TemplateDefaultPortfolio, {
  type TemplateDefaultPortfolioProps,
} from './TemplateDefaultPortfolio'

const meta: Meta<typeof TemplateDefaultPortfolio> = {
  title: 'Components/TemplateDefaultPortfolio',
  component: TemplateDefaultPortfolio,
}

export default meta
type Story = StoryObj<TemplateDefaultPortfolioProps>

export const Default: Story = {}
