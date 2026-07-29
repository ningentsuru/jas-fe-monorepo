import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomNavLink from './AtomNavLink'

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
type Story = StoryObj<typeof AtomNavLink>

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
  render: (args) => ({
    components: { AtomNavLink },
    setup() {
      return { args }
    },
    template: `
      <AtomNavLink v-bind="args">
        <template #trailing>
          <span class="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">5</span>
        </template>
      </AtomNavLink>
    `,
  }),
}
