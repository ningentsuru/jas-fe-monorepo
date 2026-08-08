import { computed, ref, onMounted } from 'vue'
import type { Themes } from '#entities/theme/types'

export function useAppTheme() {
  const colorMode = useColorMode()
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  function toggleTheme() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(theme: Themes) {
    colorMode.preference = theme
  }

  const themeClass = computed(() => {
    if (!isMounted.value) {
      return 'light-theme'
    }

    if (colorMode.preference === 'system') {
      return `${colorMode.value}-theme`
    }
    return `${colorMode.preference}-theme`
  })

  return {
    theme: computed(() => colorMode.preference),
    isDark: computed(() => colorMode.value === 'dark'),
    themeClass,
    toggleTheme,
    setTheme,
  }
}
