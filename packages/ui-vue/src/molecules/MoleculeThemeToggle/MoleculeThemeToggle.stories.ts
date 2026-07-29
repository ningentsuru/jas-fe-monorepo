import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import { MoleculeThemeToggle, type ThemeType } from './MoleculeThemeToggle'

const meta: Meta<typeof MoleculeThemeToggle> = {
  title: 'Components/MoleculeThemeToggle',
  component: MoleculeThemeToggle,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
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
  render: (args) => ({
    components: { MoleculeThemeToggle },
    setup() {
      const localTheme = ref<ThemeType>(args.currentTheme ?? 'light')
      const localToggled = ref<boolean>(args.isToggled ?? false)

      watch(
        () => args.currentTheme,
        (newTheme) => {
          if (newTheme) localTheme.value = newTheme
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

      function handleSetTheme(theme: ThemeType) {
        localTheme.value = theme
        localToggled.value = theme !== 'light'
      }

      return { args, localTheme, localToggled, handleToggle, handleSetTheme }
    },
    template: `
      <div class="p-6">
        <MoleculeThemeToggle
          v-bind="args"
          :current-theme="localTheme"
          :is-toggled="localToggled"
          @toggle="handleToggle"
          @set-theme="handleSetTheme"
        />
        <div class="mt-4 text-sm text-muted-foreground">
          Active Theme State: <span class="font-bold font-mono text-foreground">{{ localTheme }}</span>
        </div>
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
