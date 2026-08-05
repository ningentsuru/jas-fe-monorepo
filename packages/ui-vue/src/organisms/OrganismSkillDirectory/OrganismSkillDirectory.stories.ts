import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismSkillDirectory from './OrganismSkillDirectory.vue'

const meta: Meta<typeof OrganismSkillDirectory> = {
  component: OrganismSkillDirectory,
  title: 'Components/OrganismSkillDirectory',
}

export default meta
type Story = StoryObj<typeof OrganismSkillDirectory>

export const Default: Story = {
  args: {},
}
