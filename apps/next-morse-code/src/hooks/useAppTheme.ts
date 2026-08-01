// hooks/useAppTheme.ts
'use client'

import { useTheme } from 'next-themes'
import { useMemo, useSyncExternalStore } from 'react'
import type { Themes } from '@/types'

// Simple empty snapshot functions to detect server vs browser state
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Safely evaluates to true on client and false on server with ZERO useEffects
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme])

  return {
    theme,
    toggleTheme,
    isDark,
    setTheme: (newTheme: Themes) => setTheme(newTheme),
    isMounted,
  }
}
