import type { Meta, StoryObj } from '@storybook/react-vite'
import OrganismHeader, { type OrganismHeaderProps } from './OrganismHeader'

const mockNavigationData = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Resources',
    children: [
      { label: 'Component Atoms', href: '/atoms' },
      { label: 'Molecules Core', href: '/molecules' },
    ],
  },
  { label: 'Pricing Plan', href: '/pricing' },
]

const meta: Meta<typeof OrganismHeader> = {
  title: 'Components/OrganismHeader',
  component: OrganismHeader,
  args: {
    navItems: mockNavigationData,
  },
}

export default meta
type Story = StoryObj<OrganismHeaderProps>

export const Default: Story = {}

export const EmptyNavigationShell: Story = {
  args: {
    navItems: [],
  },
}
