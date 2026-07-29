import type { Meta, StoryObj } from '@storybook/react-vite'
import MoleculeThemeToggle, { type MoleculeThemeToggleProps } from './MoleculeThemeToggle'

const meta: Meta<typeof MoleculeThemeToggle> = {
  title: 'Components/MoleculeThemeToggle',
  component: MoleculeThemeToggle,
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Accepts preset name strings or custom pixel layout numbers',
    },
    currentTheme: {
      control: 'select',
      options: ['light', 'dark', 'forest', 'ocean', 'sunset', 'high-contrast'],
    },
  },
  args: {
    isToggled: false,
    currentTheme: 'light',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<MoleculeThemeToggleProps>

export const Default: Story = {}

export const DarkModeActive: Story = {
  args: {
    isToggled: true,
    currentTheme: 'dark',
  },
}

export const CustomForestTheme: Story = {
  args: {
    isToggled: true,
    currentTheme: 'forest',
  },
}
