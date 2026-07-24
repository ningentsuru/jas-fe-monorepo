import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismFooter from './OrganismFooter.vue'

const meta: Meta<typeof OrganismFooter> = {
  component: OrganismFooter,
  title: 'Components/OrganismFooter',
}

export default meta
type Story = StoryObj<typeof OrganismFooter>

export const Default: Story = {
  args: {
    title: '',
  },
}
