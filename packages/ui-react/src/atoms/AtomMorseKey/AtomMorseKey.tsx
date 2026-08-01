'use client'

import * as React from 'react'
import { useLongPressToggle } from '../../hooks/useLongPressToggle'
import { audioMorsePlayer } from '../../utils/audioMorsePlayer'

export interface AtomMorseKeyProps {
  onDot: () => void
  onDash: () => void
  onInteraction?: () => void
  label?: string
  signalDelay?: number
  disabled?: boolean
  tabIndex?: number
}

export const AtomMorseKey = ({
  onDot,
  onDash,
  onInteraction,
  label = 'TAP / HOLD',
  signalDelay = 250,
  disabled = false,
  tabIndex = 0,
}: AtomMorseKeyProps) => {
  const [isActive, setIsActive] = React.useState<boolean>(false)

  const longPressHandlers = useLongPressToggle({
    delay: signalDelay,
    onToggle: () => {
      if (disabled) return
      audioMorsePlayer.stopSignal()
      setIsActive(false)
      onDot()
    },
    onLongToggle: () => {
      if (disabled) return
      audioMorsePlayer.stopSignal()
      setIsActive(false)
      onDash()
    },
  })

  // Unified pointer handler for both mobile touch and desktop clicks
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return

      setIsActive(true)
      onInteraction?.()
      audioMorsePlayer.startSignal(600)
      longPressHandlers.onPointerDown(e)
    },
    [longPressHandlers, disabled, onInteraction],
  )

  const handlePointerUp = React.useCallback(() => {
    if (disabled) return
    setIsActive(false)
    audioMorsePlayer.stopSignal()
    longPressHandlers.onPointerUp()
  }, [longPressHandlers, disabled])

  const handlePointerLeave = React.useCallback(() => {
    if (disabled) return
    setIsActive(false)
    audioMorsePlayer.stopSignal()
    longPressHandlers.onPointerLeave()
  }, [longPressHandlers, disabled])

  // Keyboard accessibility handlers
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || e.repeat) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setIsActive(true)
        onInteraction?.()
        audioMorsePlayer.startSignal(600)
        longPressHandlers.onKeyDown(e)
      }
    },
    [longPressHandlers, disabled, onInteraction],
  )

  const handleKeyUp = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setIsActive(true) // Set to true right before resolution so toggle knows state
        setIsActive(false)
        audioMorsePlayer.stopSignal()
        longPressHandlers.onKeyUp(e)
      }
    },
    [longPressHandlers, disabled],
  )

  return (
    <button
      {...(disabled ? {} : longPressHandlers)}
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      // Blocks the Android context menu popup & system vibration on long hold
      onContextMenu={(e) => e.preventDefault()}

      role="button"
      aria-label={`Telegraph Key: ${disabled ? 'Locked' : label}`}
      aria-disabled={disabled}
      aria-pressed={isActive}

      // touch-none + select-none kills Android/iOS system feedback loops flawlessly
      className={`focus-visible:ring-ring flex h-48 w-48 touch-none flex-col items-center justify-center rounded-full border-4 font-sans text-lg font-bold tracking-wider shadow-md outline-hidden transition-all duration-500 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        disabled
          ? 'bg-muted border-border text-muted-foreground scale-100 cursor-not-allowed opacity-40 shadow-none'
          : isActive
            ? 'bg-primary border-primary text-primary-foreground scale-95 shadow-inner'
            : 'bg-card border-border text-foreground hover:border-muted-foreground cursor-pointer hover:scale-102'
      } `}
      data-testid="atom-morse-key"
      // Inline styles to completely guarantee browser selection bubbles are suppressed
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
    >
      <span className="mb-1 text-xs uppercase opacity-60" aria-hidden="true">
        Telegraph Key
      </span>
      <span className="font-display text-xl font-black" aria-hidden="true">
        {disabled ? 'LOCKED' : label}
      </span>
      <div
        aria-hidden="true"
        className={`mt-2 h-3 w-3 rounded-full transition-colors duration-150 ${disabled ? 'bg-border' : isActive ? 'bg-primary-foreground animate-ping' : 'bg-muted-foreground'} `}
      />
    </button>
  )
}

export default AtomMorseKey
