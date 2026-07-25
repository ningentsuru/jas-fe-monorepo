import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomNavLink from './AtomNavLink.vue'

const meta: Meta<typeof AtomNavLink> = {
  component: AtomNavLink,
  title: 'Components/AtomNavLink',
}

export default meta
type Story = StoryObj<typeof AtomNavLink>

export const Default: Story = {
  args: {
    label: '',
    href: '',
    to: '',
    variant: '',
    size: '',
    active: false,
  },
}
