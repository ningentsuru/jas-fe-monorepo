import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismProfileHero from './OrganismProfileHero.vue'

const meta: Meta<typeof OrganismProfileHero> = {
  title: 'Organisms/OrganismProfileHero',
  component: OrganismProfileHero,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    profile: { control: 'object' },
  },
  args: {
    isLoading: false,
    profile: {
      statusBadge: 'Available for Advanced Architecture Tasks',
      fullName: 'Joshua Alexis Natividad Sardido',
      headline: 'Frontend Engineer specializing in building and modernizing applications with <span class="text-foreground font-semibold">Vue 3, Nuxt 4, and TypeScript</span>.',
      phoneRaw: '09174028632',
      phoneFormatted: '0917-402-8632',
      location: 'General Trias City, Cavite, PH',
    },
  },
}

export default meta
type Story = StoryObj<typeof OrganismProfileHero>

export const Default: Story = {}
export const Loading: Story = { args: { isLoading: true } }
