import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismFooter from './OrganismFooter.vue'

const meta: Meta<typeof OrganismFooter> = {
  title: 'Organisms/OrganismFooter',
  component: OrganismFooter,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isLoading: { control: 'boolean' },
    isSubmitting: { control: 'boolean' },
    submitSuccess: { control: 'boolean' },
    submitError: { control: 'boolean' },
    onSubmit: { action: 'submit' },
  },
  args: {
    title: "Let's Connect",
    isLoading: false,
    isSubmitting: false,
    submitSuccess: false,
    submitError: false,
  },
}

export default meta
type Story = StoryObj<typeof OrganismFooter>

export const Default: Story = {}
export const Submitting: Story = { args: { isSubmitting: true } }
export const Success: Story = { args: { submitSuccess: true } }
export const ErrorState: Story = { args: { submitError: true } }
