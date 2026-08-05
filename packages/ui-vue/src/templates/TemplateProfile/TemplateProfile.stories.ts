import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateProfile from './TemplateProfile.vue'

const meta: Meta<typeof TemplateProfile> = {
  component: TemplateProfile,
  title: 'Components/TemplateProfile',
}

export default meta
type Story = StoryObj<typeof TemplateProfile>

export const Default: Story = {
  args: {},
}
