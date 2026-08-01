'use client'

import { useMemo, useCallback, useSyncExternalStore } from 'react'
import type { Themes } from '@/types'

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}

  window.addEventListener('storage', callback)
  window.addEventListener('local-theme-change', callback)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('local-theme-change', callback)
  }
}

const getSnapshot = () => {
  if (typeof window === 'undefined') return 'light'

  const saved = localStorage.getItem('app-theme') || 'light'

  if (document.documentElement.getAttribute('data-theme') !== saved) {
    document.documentElement.setAttribute('data-theme', saved)
  }

  return saved
}

const getServerSnapshot = () => 'light'

const mountGetSnapshot = () => true
const mountGetServerSnapshot = () => false

export function useAppTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as Themes
  const isMounted = useSyncExternalStore(subscribe, mountGetSnapshot, mountGetServerSnapshot)

  const setTheme = useCallback((newTheme: Themes) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)

      window.dispatchEvent(new Event('local-theme-change'))
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme as Themes)
  }, [theme, setTheme])

  return {
    theme,
    toggleTheme,
    isDark: useMemo(() => theme === 'dark', [theme]),
    setTheme,
    isMounted,
  }
}
