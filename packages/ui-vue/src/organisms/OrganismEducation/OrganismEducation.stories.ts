import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismEducation from './OrganismEducation.vue'

const meta: Meta<typeof OrganismEducation> = {
  title: 'Organisms/OrganismEducation',
  component: OrganismEducation,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    education: { control: 'object' },
  },
  args: {
    isLoading: false,
    education: {
      title: 'Bachelor of Science in Information Technology',
      institutions: [
        { name: 'STI Academic Center - Las Piñas', period: '2015 - 2017' },
        {
          name: 'University of Perpetual Help System DALTA - Las Piñas',
          period: '2012 - 2015',
          badge: 'Transferred',
        },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof OrganismEducation>

export const Default: Story = {}
export const Loading: Story = { args: { isLoading: true } }
