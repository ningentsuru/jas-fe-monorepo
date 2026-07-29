import type { Meta, StoryObj } from '@storybook/react-vite'
import OrganismFooter, { type OrganismFooterProps } from './OrganismFooter'

const meta: Meta<typeof OrganismFooter> = {
  title: 'Components/OrganismFooter',
  component: OrganismFooter,
  args: {
    title: 'Core Design System Inc.',
  },
}

export default meta
type Story = StoryObj<OrganismFooterProps>

export const Default: Story = {}

export const AlternativeTitle: Story = {
  args: {
    title: 'Monorepo Platform Footer Layer',
  },
}
