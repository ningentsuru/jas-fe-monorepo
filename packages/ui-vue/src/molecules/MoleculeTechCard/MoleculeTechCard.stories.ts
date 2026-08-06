import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Code2, Terminal, Cpu } from '@lucide/vue'
import MoleculeTechCard from './MoleculeTechCard.vue'

const meta: Meta<typeof MoleculeTechCard> = {
  title: 'Molecules/MoleculeTechCard',
  component: MoleculeTechCard,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The label or name of the technical framework or programming language',
    },
    level: {
      control: 'select',
      options: ['Expert', 'Advanced', 'Intermediate', 'Beginner'],
      description: 'The proficiency or skill depth classification level',
    },
    icon: {
      control: false,
      description: 'Vue Lucide icon rendering target element wrapper node',
    },
  },
  args: {
    name: 'Vue.js 3 / Nuxt 4',
    level: 'Expert',
    icon: Code2,
  },
}

export default meta
type Story = StoryObj<typeof MoleculeTechCard>

export const Default: Story = {}

export const AdvancedTier: Story = {
  args: {
    name: 'TypeScript / ES2025',
    level: 'Advanced',
    icon: Terminal,
  },
}

export const IntermediateTier: Story = {
  args: {
    name: 'Docker Containers',
    level: 'Intermediate',
    icon: Cpu,
  },
}
