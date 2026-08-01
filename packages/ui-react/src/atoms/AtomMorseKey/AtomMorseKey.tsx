'use client'

import * as React from 'react'
import { useLongPressToggle } from '../../hooks/useLongPressToggle'
import { audioMorsePlayer } from '../../utils/audioMorsePlayer'

export interface AtomMorseKeyProps {
  onDot: () => void
  onDash: () => void
  onInteraction?: () => void
  onUnlock?: () => void
  onShutdown?: () => void
  label?: string
  signalDelay?: number
  disabled?: boolean
  tabIndex?: number
}

export const AtomMorseKey = ({
  onDot,
  onDash,
  onInteraction,
  onUnlock,
  onShutdown,
  label = 'TAP / HOLD',
  signalDelay = 250,
  disabled = false,
  tabIndex = 0,
}: AtomMorseKeyProps) => {
  const [isUnlocked, setIsUnlocked] = React.useState<boolean>(false)
  const [isActive, setIsActive] = React.useState<boolean>(false)

  const justUnlockedRef = React.useRef<boolean>(false)
  const shutdownTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleKeyShutdown = React.useCallback(() => {
    setIsUnlocked(false)
    setIsActive(false)
    justUnlockedRef.current = false
    audioMorsePlayer.stopSignal()
    audioMorsePlayer.stopDummySilence()
    if (shutdownTimerRef.current) clearTimeout(shutdownTimerRef.current)
    onShutdown?.()
  }, [onShutdown])

  const resetKeyInactivityTimer = React.useCallback(() => {
    if (shutdownTimerRef.current) clearTimeout(shutdownTimerRef.current)
    shutdownTimerRef.current = setTimeout(() => {
      handleKeyShutdown()
    }, 5000)
  }, [handleKeyShutdown])

  React.useEffect(() => {
    if (disabled) {
      handleKeyShutdown()
    }
  }, [disabled, handleKeyShutdown])

  React.useEffect(() => {
    return () => {
      if (shutdownTimerRef.current) clearTimeout(shutdownTimerRef.current)
    }
  }, [])

  const longPressHandlers = useLongPressToggle({
    delay: signalDelay,
    onToggle: () => {
      if (disabled || !isUnlocked || justUnlockedRef.current) return
      audioMorsePlayer.stopSignal()
      setIsActive(false)
      onDot()
    },
    onLongToggle: () => {
      if (disabled || !isUnlocked || justUnlockedRef.current) return
      audioMorsePlayer.stopSignal()
      setIsActive(false)
      onDash()
    },
  })

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return

      if (!isUnlocked) {
        justUnlockedRef.current = true
        setIsUnlocked(true)
        audioMorsePlayer.startDummySilence()
        onUnlock?.()
        resetKeyInactivityTimer()
        return
      }

      justUnlockedRef.current = false
      setIsActive(true)
      onInteraction?.()
      audioMorsePlayer.startSignal(600)
      longPressHandlers.onPointerDown(e)
      resetKeyInactivityTimer()
    },
    [longPressHandlers, disabled, isUnlocked, onUnlock, onInteraction, resetKeyInactivityTimer],
  )

  const handlePointerUp = React.useCallback(() => {
    if (disabled || !isUnlocked) return

    if (justUnlockedRef.current) {
      justUnlockedRef.current = false
      return
    }

    setIsActive(false)
    audioMorsePlayer.stopSignal()
    longPressHandlers.onPointerUp()
    resetKeyInactivityTimer()
  }, [longPressHandlers, disabled, isUnlocked, resetKeyInactivityTimer])

  const handlePointerLeave = React.useCallback(() => {
    if (disabled || !isUnlocked) return

    if (justUnlockedRef.current) {
      justUnlockedRef.current = false
      return
    }

    setIsActive(false)
    audioMorsePlayer.stopSignal()
    longPressHandlers.onPointerLeave()
    resetKeyInactivityTimer()
  }, [longPressHandlers, disabled, isUnlocked, resetKeyInactivityTimer])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || e.repeat) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()

        if (!isUnlocked) {
          justUnlockedRef.current = true
          setIsUnlocked(true)
          audioMorsePlayer.startDummySilence()
          onUnlock?.()
          resetKeyInactivityTimer()
          return
        }

        justUnlockedRef.current = false
        setIsActive(true)
        onInteraction?.()
        audioMorsePlayer.startSignal(600)
        longPressHandlers.onKeyDown(e)
        resetKeyInactivityTimer()
      }
    },
    [longPressHandlers, disabled, isUnlocked, onUnlock, onInteraction, resetKeyInactivityTimer],
  )

  const handleKeyUp = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (disabled || !isUnlocked) return

        if (justUnlockedRef.current) {
          justUnlockedRef.current = false
          return
        }

        setIsActive(false)
        audioMorsePlayer.stopSignal()
        longPressHandlers.onKeyUp(e)
        resetKeyInactivityTimer()
      }
    },
    [longPressHandlers, disabled, isUnlocked, resetKeyInactivityTimer],
  )

  const primaryText = disabled ? 'LOCKED' : !isUnlocked ? 'UNLOCK' : label

  return (
    <button
      ref={buttonRef}
      {...(disabled || !isUnlocked ? {} : longPressHandlers)}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onContextMenu={(e) => e.preventDefault()}

      role="button"
      aria-label={`Telegraph Key: ${primaryText}`}
      aria-disabled={disabled}
      aria-pressed={isActive}

      className={`focus-visible:ring-ring flex h-48 w-48 touch-none flex-col items-center justify-center rounded-full border-4 font-sans text-lg font-bold tracking-wider shadow-md outline-hidden transition-all duration-500 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        disabled
          ? 'bg-muted border-border text-muted-foreground scale-100 cursor-not-allowed opacity-40 shadow-none'
          : isActive
            ? 'bg-primary border-primary text-primary-foreground scale-95 shadow-inner'
            : !isUnlocked
              ? 'bg-card text-foreground hover:bg-muted animate-pulse cursor-pointer border-amber-500/80 hover:scale-102 dark:border-amber-400/80'
              : 'bg-card border-border text-foreground hover:border-muted-foreground cursor-pointer hover:scale-102'
      } `}
      data-testid="atom-morse-key"
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
    >
      <span className="mb-1 text-xs uppercase opacity-60" aria-hidden="true">
        Telegraph Key
      </span>
      <span className="font-display text-xl font-black" aria-hidden="true">
        {primaryText}
      </span>
      <div
        aria-hidden="true"
        className={`mt-2 h-3 w-3 rounded-full transition-colors duration-150 ${
          disabled
            ? 'bg-border'
            : !isUnlocked
              ? 'bg-amber-500 dark:bg-amber-400'
              : isActive
                ? 'bg-primary-foreground animate-ping'
                : 'bg-success'
        } `}
      />
    </button>
  )
}

export default AtomMorseKey
