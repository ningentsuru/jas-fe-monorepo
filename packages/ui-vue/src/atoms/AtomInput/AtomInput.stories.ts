import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomInput from './AtomInput.vue'

const meta: Meta<typeof AtomInput> = {
  title: 'Components/AtomInput',
  component: AtomInput,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset name strings or a custom numeric height value',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
  args: {
    modelValue: '',
    placeholder: 'Enter secure credential node strings...',
    disabled: false,
    error: false,
    size: 'md',
    type: 'text',
  },
}

export default meta
type Story = StoryObj<typeof AtomInput>

export const Default: Story = {}

export const ErrorState: Story = {
  args: {
    error: true,
    placeholder: 'Invalid parameter layout detected...',
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 55,
  },
}

export const WithPrefixAndSuffix: Story = {
  render: (args) => ({
    components: { AtomInput },
    setup() {
      return { args }
    },
    template: `
      <AtomInput v-bind="args">
        <template #prefix>
          <span class="text-xs select-none">🌐</span>
        </template>
        <template #suffix>
          <span class="text-xs select-none">🔍</span>
        </template>
      </AtomInput>
    `,
  }),
}
