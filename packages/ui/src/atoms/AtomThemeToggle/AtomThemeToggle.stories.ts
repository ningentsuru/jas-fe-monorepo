import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomThemeToggle from './AtomThemeToggle.vue'

const meta: Meta<typeof AtomThemeToggle> = {
  component: AtomThemeToggle,
  title: 'Components/AtomThemeToggle',
}

export default meta
type Story = StoryObj<typeof AtomThemeToggle>

export const Default: Story = {
  args: {
    isDark: false,
  },
}
