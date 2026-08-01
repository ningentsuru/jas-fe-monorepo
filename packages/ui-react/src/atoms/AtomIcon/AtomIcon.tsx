'use client'

import { useMemo, type ElementType, type CSSProperties } from 'react'

export interface AtomIconProps {
  name?: string
  icon?: ElementType
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
}

export const AtomIcon = ({
  name = '',
  icon: DynamicIcon,
  size = 'md',
  className = '',
}: AtomIconProps) => {
  const iconClass = useMemo(() => {
    const baseClasses = 'text-[var(--color-foreground)] transition-colors'
    const customSizeClass = className.trim()

    if (typeof size === 'number') {
      return `${baseClasses} w-[var(--icon-size)] h-[var(--icon-size)] ${customSizeClass}`.trim()
    }

    const sizeMap: Record<string, string> = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    }

    const currentSize = sizeMap[size] || sizeMap.md
    return `${baseClasses} ${currentSize} ${customSizeClass}`.trim()
  }, [size, className])

  const iconStyle = useMemo<CSSProperties>(() => {
    if (typeof size === 'number') {
      return { '--icon-size': `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  return (
    <div
      className="atom-icon inline-flex items-center justify-center"
      data-testid="atom-icon"
      style={iconStyle}
    >
      {DynamicIcon ? (
        <DynamicIcon className={iconClass} />
      ) : name ? (
        <span className="text-sm">{name}</span>
      ) : null}

      <span className="sr-only">atom-icon</span>
    </div>
  )
}

export default AtomIcon
