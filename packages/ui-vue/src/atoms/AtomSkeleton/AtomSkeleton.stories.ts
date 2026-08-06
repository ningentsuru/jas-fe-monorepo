import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomSkeleton from './AtomSkeleton.vue'

const meta: Meta<typeof AtomSkeleton> = {
  title: 'Atoms/AtomSkeleton',
  component: AtomSkeleton,
  tags: ['autodocs'],
  argTypes: {
    // Documenting the native class attribute for the Storybook docs panel
    class: {
      control: 'text',
      description: 'Standard Tailwind sizing and layout classes applied directly to the root element.',
    },
  },
}

export default meta
type Story = StoryObj<typeof AtomSkeleton>

export const Default: Story = {
  args: {
    class: 'h-4 w-48 rounded',
  },
}

export const CircularProfileAvatar: Story = {
  args: {
    class: 'size-12 rounded-full',
  },
}
