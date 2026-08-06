import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismHeader from './OrganismHeader.vue'

const meta: Meta<typeof OrganismHeader> = {
  title: 'Organisms/OrganismHeader',
  component: OrganismHeader,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Collapses the header track layout into a small loading capsule button shape',
    },
  },
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
          <div class="flex items-center gap-2 font-bold text-foreground text-sm cursor-pointer select-none">
            <span class="bg-primary text-primary-foreground h-7 w-7 rounded-md flex items-center justify-center font-black">Ω</span>
            <span>Joshua Alexis Portfolio</span>
          </div>
        </template>

        <template #navigation>
          <div class="hidden md:flex items-center gap-4 text-xs font-semibold text-muted-foreground px-4">
            <span class="text-primary cursor-pointer">About</span>
            <span class="hover:text-primary cursor-pointer transition-colors">Experience</span>
            <span class="hover:text-primary cursor-pointer transition-colors">Contact</span>
          </div>
        </template>

        <template #theme-toggle>
          <button type="button" class="text-[10px] uppercase font-bold tracking-wider border border-border rounded-full px-3 h-7 hover:bg-muted transition-all">
            Theme
          </button>
        </template>
      </OrganismHeader>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof OrganismHeader>

export const Default: Story = {}

export const LoadingCapsuleShell: Story = {
  args: {
    isLoading: true,
  },
}
