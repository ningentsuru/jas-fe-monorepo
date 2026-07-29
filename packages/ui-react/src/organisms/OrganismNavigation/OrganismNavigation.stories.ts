import type { Meta, StoryObj } from '@storybook/react-vite'
import OrganismNavigation, { type OrganismNavigationProps } from './OrganismNavigation'

const mockNavigationTree = [
  { label: 'Home Page', href: '/' },
  {
    label: 'Services Matrix',
    children: [
      { label: 'Web Application Suite', href: '/web' },
      { label: 'Mobile Engineering', href: '/mobile' },
      { label: 'Cloud Systems Dev', href: '/cloud' },
    ],
  },
  {
    label: 'Company Hub',
    children: [
      { label: 'About Our Team', href: '/about' },
      { label: 'Careers Matrix', href: '/careers' },
    ],
  },
  { label: 'Contact Help', href: '/contact' },
]

const meta: Meta<typeof OrganismNavigation> = {
  title: 'Components/OrganismNavigation',
  component: OrganismNavigation,
  args: {
    items: mockNavigationTree,
  },
}

export default meta
type Story = StoryObj<OrganismNavigationProps>

export const Default: Story = {}

export const EmptyShellState: Story = {
  args: {
    items: [],
  },
}
