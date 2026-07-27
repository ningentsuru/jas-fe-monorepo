import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismFooter from './OrganismFooter.vue'

const meta: Meta<typeof OrganismFooter> = {
  title: 'Components/OrganismFooter',
  component: OrganismFooter,
  args: {
    title: 'Core Design System Inc.',
  },
  render: (args) => ({
    components: { OrganismFooter },
    setup() {
      return { args }
    },
    template: `
      <OrganismFooter v-bind="args">
        <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-primary transition-colors">Contact</a>
      </OrganismFooter>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof OrganismFooter>

export const Default: Story = {}

export const AlternativeTitle: Story = {
  args: {
    title: 'Monorepo Platform Footer Layer',
  },
}
