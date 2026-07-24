import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomSelect from './AtomSelect.vue'

const meta: Meta<typeof AtomSelect> = {
  component: AtomSelect,
  title: 'Components/AtomSelect',
}

export default meta
type Story = StoryObj<typeof AtomSelect>

export const Default: Story = {
  args: {
    modelValue: '',
    options: [{}],
  },
}
