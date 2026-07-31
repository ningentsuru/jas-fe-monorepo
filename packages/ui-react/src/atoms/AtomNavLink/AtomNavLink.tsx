'use client'

import { type ReactNode, type MouseEvent } from 'react'
import { AtomButton } from '../../'

export interface AtomNavLinkProps {
  label: string
  href?: string
  to?: string | { path?: string;[key: string]: unknown }
  variant?: 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  active?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  trailing?: ReactNode
}

export const AtomNavLink = ({
  label,
  href,
  to,
  variant = 'ghost',
  size = 'md',
  active = false,
  onClick,
  trailing
}: AtomNavLinkProps) => {
  function handleClick(event: MouseEvent<HTMLElement>) {
    onClick?.(event)
  }

  return (
    <AtomButton
      variant={variant}
      size={size}
      href={href}
      to={to}
      onClick={handleClick}
      className={[
        'w-full items-center justify-between',
        active ? 'text-primary' : 'text-foreground',
        variant === 'link' ? 'px-3 py-2 font-normal' : 'px-3 py-2 font-medium',
      ].filter(Boolean).join(' ')}
    >
      <span className="flex-1 text-left">{label}</span>
      {trailing}
    </AtomButton>
  )
}

export default AtomNavLink
