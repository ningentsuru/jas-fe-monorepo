import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomSkeleton from './AtomSkeleton.vue'

const meta: Meta<typeof AtomSkeleton> = {
  component: AtomSkeleton,
  title: 'Components/AtomSkeleton',
}

export default meta
type Story = StoryObj<typeof AtomSkeleton>

export const Default: Story = {
  args: {
    class: '',
  },
}
