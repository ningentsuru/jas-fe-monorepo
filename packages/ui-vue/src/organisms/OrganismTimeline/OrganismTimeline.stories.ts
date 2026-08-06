import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismTimeline from './OrganismTimeline.vue'

const meta: Meta<typeof OrganismTimeline> = {
  title: 'Organisms/OrganismTimeline',
  component: OrganismTimeline,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Toggles skeleton placeholder loading state',
    },
    items: {
      control: 'object',
      description: 'List of historical professional experiences or job timeline metrics',
    },
  },
  args: {
    isLoading: false,
    items: [
      {
        role: 'Senior Frontend Engineer',
        company: 'TechCorp Solutions',
        period: '2024 — Present',
        metrics: [
          'Led migration of monolithic dashboard to Vue 3 and Vite, increasing HMR speeds by 40%.',
          'Architected an internal shared component library with Tailwind CSS, reducing duplicate code by 30%.',
          'Optimized core web vitals, resulting in an 18-point increase in Lighthouse Performance score.',
        ],
      },
      {
        role: 'Full Stack Developer',
        company: 'DevFlow Agency',
        period: '2022 — 2024',
        metrics: [
          'Implemented end-to-end continuous integration pipelines using GitHub Actions and Turborepo.',
          'Built and maintained highly accessible components matching WAI-ARIA authoring guidelines.',
        ],
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof OrganismTimeline>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}
