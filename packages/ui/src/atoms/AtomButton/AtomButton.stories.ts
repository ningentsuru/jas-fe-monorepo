import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomButton from './AtomButton.vue'

const meta: Meta<typeof AtomButton> = {
  title: 'Components/AtomButton',
  component: AtomButton,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'ghost', 'link', 'destructive'],
    },
    target: { control: 'select', options: ['_blank', '_self', '_parent', '_top'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
  args: {
    size: 'md',
    variant: 'default',
    disabled: false,
    type: 'button',
  },
  // Global render to handle the default slot content across stories
  render: (args) => ({
    components: { AtomButton },
    setup() {
      return { args }
    },
    template: '<AtomButton v-bind="args">Click me</AtomButton>',
  }),
}

export default meta
type Story = StoryObj<typeof AtomButton>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const ExternalLink: Story = {
  args: {
    href: 'https://google.com',
    target: '_blank',
  },
}
