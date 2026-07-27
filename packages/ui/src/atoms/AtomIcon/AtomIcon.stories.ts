import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Atom } from '@lucide/vue'
import AtomIcon from './AtomIcon.vue'

const meta: Meta<typeof AtomIcon> = {
  component: AtomIcon,
  title: 'Components/AtomIcon',
}

export default meta
type Story = StoryObj<typeof AtomIcon>

export const Default: Story = {
  args: {
    name: 'Default Icon Text',
    size: 'md',
  },
}

export const WithNumericSize: Story = {
  args: {
    name: 'Custom Pixels',
    size: 42,
  },
}

export const WithIconComponent: Story = {
  args: {
    size: 'lg',
    icon: Atom,
  },
}
