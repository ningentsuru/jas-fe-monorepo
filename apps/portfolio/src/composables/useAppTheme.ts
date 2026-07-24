import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

export function useAppTheme() {
  const mode = useColorMode({
    attribute: 'class',
  })

  const toggleTheme = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme: mode,
    toggleTheme,
    isDark: computed(() => mode.value === 'dark'),
  }
}
