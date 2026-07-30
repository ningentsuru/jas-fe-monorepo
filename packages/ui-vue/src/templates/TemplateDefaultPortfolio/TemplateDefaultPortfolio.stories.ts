import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateDefaultPortfolio from './TemplateDefaultPortfolio.vue'

const meta: Meta<typeof TemplateDefaultPortfolio> = {
  component: TemplateDefaultPortfolio,
  title: 'Components/TemplateDefaultPortfolio',
}

export default meta
type Story = StoryObj<typeof TemplateDefaultPortfolio>

export const Default: Story = {
  render: (args) => ({
    components: { TemplateDefaultPortfolio },
    setup() {
      return { args }
    },
    template: `
      <TemplateDefaultPortfolio class="-my-4" v-bind="args">
        <template #header>
          <div class="p-4 bg-muted border-b text-center font-medium">Header Slot Area</div>
        </template>
        
        <template #default>
          <div class="p-8 flex-1 text-center">
            <h1 class="text-2xl font-bold mb-2">Main Portfolio Body Content</h1>
            <p class="text-muted-foreground">This area acts as your primary route viewport layer.</p>
          </div>
        </template>
        
        <template #footer>
          <div class="p-4 bg-muted border-t text-center text-sm text-muted-foreground">Footer Slot Area</div>
        </template>
      </TemplateDefaultPortfolio>
    `,
  }),
}
