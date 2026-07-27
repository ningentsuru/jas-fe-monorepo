import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomInput from './AtomInput.vue'

const meta: Meta<typeof AtomInput> = {
  title: 'Components/AtomInput',
  component: AtomInput,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names (sm, md, lg, xl) or a custom pixel number value',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
  },
  args: {
    modelValue: '',
    placeholder: 'Enter your credentials...',
    disabled: false,
    error: false,
    size: 'md',
    type: 'text',
  },
}

export default meta
type Story = StoryObj<typeof AtomInput>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    modelValue: 'John Doe',
  },
}

export const ValidationError: Story = {
  args: {
    error: true,
    placeholder: 'Invalid email formatting detected',
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 52,
    placeholder: 'Custom height input layer',
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
    modelValue: 'Locked configuration contents',
  },
}
