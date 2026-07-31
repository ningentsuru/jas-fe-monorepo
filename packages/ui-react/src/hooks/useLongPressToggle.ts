'use client'

import { useRef, useCallback } from 'react'

export interface LongPressOptions {
  delay?: number
  onToggle?: () => void
  onLongToggle?: () => void
}

export interface LongPressEventHandlers {
  onPointerDown: (e: React.PointerEvent<HTMLElement>) => void
  onPointerUp: () => void
  onPointerLeave: () => void
  onContextMenu: (e: React.MouseEvent<HTMLElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
  onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void
}

export function useLongPressToggle(options: LongPressOptions = {}): LongPressEventHandlers {
  const delay = options.delay ?? 1000

  // Track mutable state in refs to avoid triggering re-renders during interactions
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLongPressedRef = useRef<boolean>(false)
  const optionsRef = useRef<LongPressOptions>(options)

  // Keep options updated without re-running the hooks matrix
  optionsRef.current = options

  const start = useCallback(() => {
    if (timerRef.current) return
    isLongPressedRef.current = false

    timerRef.current = setTimeout(() => {
      isLongPressedRef.current = true
      optionsRef.current.onLongToggle?.()
    }, delay)
  }, [delay])

  const cancel = useCallback(() => {
    const wasLongPressed = isLongPressedRef.current
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (!wasLongPressed) {
      optionsRef.current.onToggle?.()
    }
    isLongPressedRef.current = false
  }, [])

  const handleLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    isLongPressedRef.current = false
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') {
        const currentTarget = e.currentTarget
        currentTarget.style.webkitUserSelect = 'none'
        currentTarget.style.userSelect = 'none'
      }
      start()
    },
    [start],
  )

  const onContextMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }, [])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.repeat) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        start()
      }
    },
    [start],
  )

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        cancel()
      }
    },
    [cancel],
  )

  return {
    onPointerDown,
    onPointerUp: cancel,
    onPointerLeave: handleLeave,
    onContextMenu,
    onKeyDown,
    onKeyUp,
  }
}
