import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import type { Themes } from '@/types'

export function useAppTheme() {
  const mode = useColorMode({
    attribute: 'data-theme',
    modes: {
      forest: 'forest',
      midnight: 'midnight',
      ocean: 'ocean',
      sunset: 'sunset',
      'high-contrast': 'high-contrast',
    },
  })

  function toggleTheme() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(theme: Themes) {
    mode.value = theme
  }

  return {
    theme: mode,
    toggleTheme,
    isDark: computed(() => mode.value === 'dark'),
    setTheme,
  }
}
