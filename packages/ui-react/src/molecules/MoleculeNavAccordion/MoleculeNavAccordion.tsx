'use client'

import { useMemo, type MouseEvent } from 'react'
import { ChevronRight } from 'lucide-react'
import { AtomIcon, AtomNavLink } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export interface MoleculeNavAccordionProps {
  item: NavItem
  isOpen: boolean
  onToggle?: () => void
  onNavigate?: () => void
}

export const MoleculeNavAccordion = ({
  item,
  isOpen,
  onToggle,
  onNavigate
}: MoleculeNavAccordionProps) => {
  const menuId = useMemo(() => {
    return `accordion-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`
  }, [item.label])

  function handleLinkClick(event: MouseEvent<HTMLElement>) {
    if (item.children) {
      event.preventDefault()
      event.stopPropagation()
      onToggle?.()
    } else {
      onNavigate?.()
    }
  }

  return (
    <div className="molecule-nav-accordion font-display w-full" data-testid="molecule-nav-accordion">
      <AtomNavLink
        label={item.label}
        to={item.children ? undefined : item.href}
        variant="ghost"
        size="md"
        aria-expanded={item.children ? isOpen : undefined}
        aria-controls={item.children ? menuId : undefined}
        onClick={handleLinkClick}
        trailing={
          item.children && (
            <AtomIcon
              icon={ChevronRight}
              size="sm"
              className={[
                'text-muted-foreground transition-transform duration-200',
                isOpen ? 'rotate-90' : 'rotate-0',
              ].join(' ')}
            />
          )
        }
      />

      <div
        id={menuId}
        data-testid="accordion-panel"
        className={[
          'grid overflow-hidden transition-all duration-200 ease-in-out',
          isOpen
            ? 'visible mt-1 grid-rows-[1fr] opacity-100'
            : 'invisible mt-0 grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <div className="min-h-0">
          <div className="border-border ml-4 space-y-1 border-l-2 py-1 pr-1 pl-2">
            {item.children?.map((child) => (
              <AtomNavLink
                key={child.label}
                label={child.label}
                to={child.href}
                variant="link"
                size="sm"
                onClick={() => onNavigate?.()}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoleculeNavAccordion
