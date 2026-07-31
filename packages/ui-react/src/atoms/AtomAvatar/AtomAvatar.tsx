'use client'

import { useMemo, type CSSProperties } from 'react'

export interface AtomAvatarProps {
  username?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  round?: boolean
}

export const AtomAvatar = ({
  username = '',
  size = 'md',
  round = true
}: AtomAvatarProps) => {
  const avatarInitials = useMemo(() => {
    return username.trim().slice(0, 2).toUpperCase() || '??'
  }, [username])

  const sizeClass = useMemo(() => {
    if (typeof size === 'number') return 'h-[var(--avatar-size)] w-[var(--avatar-size)]'

    const sizeMap: Record<string, string> = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-xl',
    }
    return sizeMap[size] || sizeMap.md
  }, [size])

  const avatarStyle = useMemo<CSSProperties>(() => {
    if (typeof size === 'number') {
      return { '--avatar-size': `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  return (
    <div
      className={[
        'atom-avatar border-border bg-card text-card-foreground font-display inline-flex items-center justify-center border font-bold transition-all duration-300 select-none',
        sizeClass,
        round ? 'rounded-full' : 'rounded-md',
        'hc:border-2 data-[theme=high-contrast]:border-2',
      ].filter(Boolean).join(' ')}
      style={avatarStyle}
      data-testid="atom-avatar"
    >
      <span>{avatarInitials}</span>
    </div>
  )
}

export default AtomAvatar
