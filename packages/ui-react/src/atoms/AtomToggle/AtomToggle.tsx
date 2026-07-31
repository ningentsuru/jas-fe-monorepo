'use client'

import { type ElementType, useRef } from 'react'
import { AtomIcon } from '../../'

export interface AtomToggleProps {
  icon: ElementType
  isToggled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  onToggle?: () => void
  onLongToggle?: () => void
}

export const AtomToggle = ({
  icon,
  isToggled = false,
  size = 'sm',
  onToggle,
  onLongToggle
}: AtomToggleProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLongPressRef = useRef<boolean>(false)

  const handlePointerDown = () => {
    isLongPressRef.current = false
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true
      onLongToggle?.()
    }, 200)
  }

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (!isLongPressRef.current) {
      onToggle?.()
    }
  }

  const handlePointerLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <button
      type="button"
      className={`atom-toggle focus-visible:ring-ring focus-visible:ring-offset-background flex cursor-pointer items-center justify-center rounded-md border border-transparent transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${isToggled ? 'atom-toggle--active' : ''}`}
      data-testid="atom-toggle"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <AtomIcon icon={icon} size={size} />
      <span className="sr-only">atom-toggle</span>
    </button>
  )
}

export default AtomToggle
