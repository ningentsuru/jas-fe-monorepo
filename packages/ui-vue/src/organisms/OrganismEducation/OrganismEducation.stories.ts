import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismEducation from './OrganismEducation.vue'

const meta: Meta<typeof OrganismEducation> = {
  component: OrganismEducation,
  title: 'Components/OrganismEducation',
}

export default meta
type Story = StoryObj<typeof OrganismEducation>

export const Default: Story = {
  args: {},
}
