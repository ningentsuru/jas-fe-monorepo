import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismNavigation from './OrganismNavigation.vue'

const meta: Meta<typeof OrganismNavigation> = {
  component: OrganismNavigation,
  title: 'Components/OrganismNavigation',
}

export default meta
type Story = StoryObj<typeof OrganismNavigation>

export const Default: Story = {
  args: {
    items: [{}],
  },
}
