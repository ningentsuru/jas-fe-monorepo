import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateDefaultPortfolio from './TemplateDefaultPortfolio.vue'

const meta: Meta<typeof TemplateDefaultPortfolio> = {
  component: TemplateDefaultPortfolio,
  title: 'Components/TemplateDefaultPortfolio',
}

export default meta
type Story = StoryObj<typeof TemplateDefaultPortfolio> & {
  args: { slotContent?: string }
}

const template = (args: any) => ({
  setup() {
    const { slotContent, ...props } = args

    return { args: props, slotContent }
  },
  template: `
    <div>
      <header>Header</header>
      <main v-html="args.default" />
      <footer>Footer</footer>
    </div>
  `,
})

export const Default: Story = {
  render: template,
  args: {
    default: '<p>Body</p>',
  },
}
