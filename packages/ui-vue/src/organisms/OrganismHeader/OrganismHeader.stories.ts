import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismHeader from './OrganismHeader.vue'

const meta: Meta<typeof OrganismHeader> = {
  title: 'Components/OrganismHeader',
  component: OrganismHeader,
  args: {
    isLoading: false,
  },
  render: (args) => ({
    components: { OrganismHeader },
    setup() {
      return { args }
    },
    template: `
      <OrganismHeader v-bind="args">
        <template #branding>
          <div class="flex items-center gap-2 font-bold font-display text-foreground text-lg cursor-pointer">
            <span class="bg-primary text-primary-foreground h-8 w-8 rounded-md flex items-center justify-center">Ω</span>
            <span>Monorepo App</span>
          </div>
        </template>

        <template #theme-toggle>
          <button class="text-sm border border-neutral-300 rounded px-2 py-1 hover:bg-neutral-100 transition-colors">
            Toggle Theme
          </button>
        </template>
      </OrganismHeader>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof OrganismHeader>

export const Default: Story = {}

export const EmptyNavigationShell: Story = {
  args: {
    isLoading: false,
  },
}
