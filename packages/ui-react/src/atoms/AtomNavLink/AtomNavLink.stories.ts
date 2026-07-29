import type { Meta, StoryObj } from '@storybook/react-vite'
import AtomNavLink, { type AtomNavLinkProps } from './AtomNavLink'

const meta: Meta<typeof AtomNavLink> = {
  title: 'Components/AtomNavLink',
  component: AtomNavLink,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names or a custom pixel number value',
    },
    variant: {
      control: 'select',
      options: ['ghost', 'link'],
    },
  },
}

export default meta
type Story = StoryObj<AtomNavLinkProps>

export const Default: Story = {
  args: {
    label: 'Dashboard Overview',
    variant: 'ghost',
    size: 'md',
    active: false,
  },
}

export const ActiveLink: Story = {
  args: {
    ...Default.args,
    label: 'Active Navigation Item',
    active: true,
  },
}

export const SizeXL: Story = {
  args: {
    ...Default.args,
    label: 'Extra Large Link',
    size: 'xl',
  },
}

export const CustomNumericSize: Story = {
  args: {
    ...Default.args,
    label: 'Custom Sized Link',
    size: 52,
  },
}

export const RouterLinkVariant: Story = {
  args: {
    ...Default.args,
    label: 'Go to Settings',
    to: '/settings',
  },
}

export const WithTrailingSlot: Story = {
  args: {
    ...Default.args,
    label: 'Notifications',
  },
}
