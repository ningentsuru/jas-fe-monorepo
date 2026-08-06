import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import MoleculeThemeToggle from './MoleculeThemeToggle.vue'

type ThemeValues = 'light' | 'dark' | 'forest' | 'ocean' | 'sunset' | 'high-contrast'

const meta: Meta<typeof MoleculeThemeToggle> = {
  title: 'Molecules/MoleculeThemeToggle',
  component: MoleculeThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Accepts utility size presets to control the rendering boundaries',
    },
    currentTheme: {
      control: 'select',
      options: ['light', 'dark', 'forest', 'ocean', 'sunset', 'high-contrast'],
      description: 'The active runtime theme configuration signature',
    },
    isToggled: {
      control: 'boolean',
      description: 'Tracks state parameters for basic binary switches',
    }
  },
  args: {
    isToggled: false,
    currentTheme: 'light',
    size: 'md',
  },
  render: (args) => ({
    components: { MoleculeThemeToggle },
    setup() {
      const localTheme = ref<ThemeValues>((args.currentTheme as ThemeValues) ?? 'light')
      const localToggled = ref<boolean>(args.isToggled ?? false)

      watch(
        () => args.currentTheme,
        (newTheme) => {
          if (newTheme) localTheme.value = newTheme as ThemeValues
        },
      )
      watch(
        () => args.isToggled,
        (newToggle) => {
          if (newToggle !== undefined) localToggled.value = newToggle
        },
      )

      function handleToggle() {
        localToggled.value = !localToggled.value
        localTheme.value = localToggled.value ? 'dark' : 'light'
      }

      function handleSetTheme(theme: ThemeValues) {
        localTheme.value = theme
        localToggled.value = theme !== 'light'
      }

      return { args, localTheme, localToggled, handleToggle, handleSetTheme }
    },
    template: `
      <div class="p-6 flex flex-col items-start gap-4">
        <MoleculeThemeToggle
          v-bind="args"
          :current-theme="localTheme"
          :is-toggled="localToggled"
          @toggle="handleToggle"
          @set-theme="handleSetTheme"
        />
        <p class="text-xs font-semibold text-muted-foreground">
          Active Canvas Theme State Track: <span class="font-bold font-mono text-foreground uppercase bg-muted px-2 py-0.5 rounded border border-border">{{ localTheme }}</span>
        </p>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof MoleculeThemeToggle>

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
