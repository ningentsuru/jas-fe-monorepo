import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismHeader from './OrganismHeader.vue'

const meta: Meta<typeof OrganismHeader> = {
  component: OrganismHeader,
  title: 'Components/OrganismHeader',
}

export default meta
type Story = StoryObj<typeof OrganismHeader>

export const Default: Story = {
  args: {},
}
