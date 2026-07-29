import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { OrganismNavigation } from './OrganismNavigation'

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
  render: (args) => ({
    components: { OrganismNavigation },
    setup() {
      return { args }
    },
    template: `
      <div class="min-h-96 w-full border border-dashed border-neutral-300 p-4 rounded-lg bg-background">
        <OrganismNavigation v-bind="args">
          <template #branding>
            <span class="font-bold text-foreground">LOGO BRAND</span>
          </template>
          <template #theme-toggle>
            <div class="text-xs text-muted-foreground font-mono">Theme Selector Slot Layer</div>
          </template>
        </OrganismNavigation>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof OrganismNavigation>

export const Default: Story = {}

export const EmptyShellState: Story = {
  args: {
    items: [],
  },
}
