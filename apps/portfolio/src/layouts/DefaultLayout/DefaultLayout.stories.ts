import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DefaultLayout from './DefaultLayout.vue'

const meta: Meta<typeof DefaultLayout> = {
  component: DefaultLayout,
  title: 'Components/DefaultLayout',
}

export default meta
type Story = StoryObj<typeof DefaultLayout>

export const Default: Story = {
  args: {},
}
