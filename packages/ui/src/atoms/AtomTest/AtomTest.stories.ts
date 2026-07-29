import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomTest from './AtomTest'

const meta: Meta<typeof AtomTest> = {
  component: AtomTest,
  title: 'Components/AtomTest',
  argTypes: {
    title: { control: { type: 'text' } },
    count: { control: { type: 'number' } },
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset names or a custom pixel number value',
    },
  },
  args: {
    title: '',
    count: 0,
    size: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof AtomTest>

export const Default: Story = {}
