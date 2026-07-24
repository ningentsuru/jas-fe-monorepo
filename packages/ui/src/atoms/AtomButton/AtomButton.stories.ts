import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomButton from './AtomButton.vue'

const meta: Meta<typeof AtomButton> = {
  component: AtomButton,
  title: 'Components/AtomButton',
}

export default meta
type Story = StoryObj<typeof AtomButton>

export const Default: Story = {
  args: {
    size: '',
  },
}
