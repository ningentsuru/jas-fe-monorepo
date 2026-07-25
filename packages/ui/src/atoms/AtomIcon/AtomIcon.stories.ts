import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomIcon from './AtomIcon.vue'

const meta: Meta<typeof AtomIcon> = {
  component: AtomIcon,
  title: 'Components/AtomIcon',
}

export default meta
type Story = StoryObj<typeof AtomIcon>

export const Default: Story = {
  args: {
    name: '',
    size: '',
  },
}
