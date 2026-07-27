import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomSelect from './AtomSelect.vue'

const sampleOptions = [
  { value: 'vue', label: 'Vue.js Framework' },
  { value: 'react', label: 'React Library' },
  { value: 'angular', label: 'Angular Platform', disabled: true },
  { value: 'svelte', label: 'Svelte Compiler' },
]

const meta: Meta<typeof AtomSelect> = {
  title: 'Components/AtomSelect',
  component: AtomSelect,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names (sm, md, lg, xl) or a custom number value',
    },
  },
  args: {
    modelValue: '',
    options: sampleOptions,
    placeholder: 'Choose your tech stack',
    disabled: false,
    error: false,
  },
}

export default meta
type Story = StoryObj<typeof AtomSelect>

export const Default: Story = {}

export const WithSelectedValue: Story = {
  args: {
    modelValue: 'vue',
  },
}

export const SizeXL: Story = {
  args: {
    size: 'xl',
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 58,
  },
}

export const ValidationError: Story = {
  args: {
    error: true,
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
}
