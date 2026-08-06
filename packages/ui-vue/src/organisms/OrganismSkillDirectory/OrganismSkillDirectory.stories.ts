import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Code2, Terminal, Layers, Cpu, Sparkles } from '@lucide/vue'
import OrganismSkillDirectory from './OrganismSkillDirectory.vue'

const meta: Meta<typeof OrganismSkillDirectory> = {
  title: 'Organisms/OrganismSkillDirectory',
  component: OrganismSkillDirectory,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    categories: { control: 'object' },
    techStack: { control: 'object' },
  },
  args: {
    isLoading: false,
    categories: [
      { id: 'all', label: 'All Tech' },
      { id: 'frontend', label: 'Frontend Core' },
      { id: 'backend', label: 'Backend & Data' },
      { id: 'ai', label: 'AI Operations' },
    ],
    techStack: [
      { name: 'Vue.js 3 / Nuxt 4', category: 'frontend', level: 'Expert', icon: Code2 },
      { name: 'TypeScript / ES2025', category: 'frontend', level: 'Expert', icon: Terminal },
      { name: 'Laravel / PHP', category: 'backend', level: 'Advanced', icon: Terminal },
      { name: 'Claude Code / Copilot', category: 'ai', level: 'Expert', icon: Sparkles },
    ],
  },
}

export default meta
type Story = StoryObj<typeof OrganismSkillDirectory>

export const Default: Story = {}
export const Loading: Story = { args: { isLoading: true } }
