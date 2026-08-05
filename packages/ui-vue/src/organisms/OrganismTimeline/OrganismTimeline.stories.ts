import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismTimeline from './OrganismTimeline.vue'

const meta: Meta<typeof OrganismTimeline> = {
  component: OrganismTimeline,
  title: 'Components/OrganismTimeline',
}

export default meta
type Story = StoryObj<typeof OrganismTimeline>

export const Default: Story = {
  args: {},
}
