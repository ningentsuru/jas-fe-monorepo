'use client'

import { useState, type MouseEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { AtomButton, AtomIcon, AtomNavLink } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export interface MoleculeNavDropdownProps {
  item: NavItem
  index: number
  isOpen?: boolean
  onToggle?: (index: number) => void
  onNavigate?: () => void
}

export const MoleculeNavDropdown = ({
  item,
  index,
  isOpen = false,
  onToggle,
  onNavigate
}: MoleculeNavDropdownProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="molecule-nav-dropdown group font-display relative focus-within:relative"
      data-testid="molecule-nav-dropdown"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AtomButton
        variant="ghost"
        size="sm"
        to={item.children ? undefined : item.href}
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.stopPropagation()
          if (item.children) {
            onToggle?.(index)
          }
        }}
        className="inline-flex cursor-pointer items-center gap-1 px-3 py-2 font-medium hover:bg-transparent"
      >
        <span className="text-foreground hover:text-primary transition-colors">
          {item.label}
        </span>
        {item.children && (
          <AtomIcon
            icon={ChevronDown}
            size="sm"
            className={[
              'transition-transform duration-200',
              isOpen ? 'rotate-180' : 'group-hover:rotate-180',
            ].join(' ')}
          />
        )}
      </AtomButton>

      {item.children && (
        <div
          data-testid="dropdown-panel"
          className={[
            'absolute top-full left-0 z-50 mt-2 w-48 origin-top-left transition-all duration-200 ease-out focus-within:visible focus-within:scale-100 focus-within:opacity-100',
            isOpen || isHovered
              ? 'visible scale-100 opacity-100'
              : 'invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100',
          ].join(' ')}
        >
          <div className="border-border bg-card overflow-hidden rounded-md border shadow-lg ring-1 ring-black/5">
            <div className="flex flex-col gap-1 p-1">
              {item.children.map((child) => (
                <AtomNavLink
                  key={child.label}
                  label={child.label}
                  to={child.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.()}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoleculeNavDropdown
