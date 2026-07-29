import { useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { AtomButton, MoleculeNavDropdown, MoleculeNavAccordion } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export interface OrganismNavigationProps {
  items?: NavItem[]
  branding?: ReactNode
  themeToggle?: ReactNode
}

export const OrganismNavigation = ({
  items = [],
  branding,
  themeToggle
}: OrganismNavigationProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [openAccordionItems, setOpenAccordionItems] = useState<Record<string, boolean>>({})

  function toggleMobile() {
    setIsMobileOpen((prev) => !prev)
  }

  function closeMobile() {
    setIsMobileOpen(false)
  }

  function toggleDropdown(index: number) {
    setOpenDropdownIndex((prev) => (prev === index ? null : index))
  }

  function closeDropdown() {
    setOpenDropdownIndex(null)
  }

  function toggleAccordion(label: string) {
    setOpenAccordionItems((prev) => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  function isOpen(label: string) {
    return !!openAccordionItems[label]
  }

  useEffect(() => {
    const handleDocumentClick = () => {
      closeDropdown()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobile()
        closeDropdown()
      }
    }

    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <nav className="font-display relative z-40 w-full" data-testid="organism-navigation">
      <div className="hidden w-full items-center justify-between md:flex">
        <div className="flex space-x-1" onClick={(e: MouseEvent) => e.stopPropagation()}>
          {items.map((item, index) => (
            <MoleculeNavDropdown
              key={item.label}
              item={item}
              index={index}
              isOpen={openDropdownIndex === index}
              onToggle={toggleDropdown}
              onNavigate={closeDropdown}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end md:hidden">
        <AtomButton
          data-testid="mobile-open-btn"
          variant="ghost"
          size="sm"
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <Menu className="text-foreground h-5 w-5" />
        </AtomButton>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden data-mobile-dialog" role="dialog" aria-modal="true" data-testid="mobile-dialog">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[theme=high-contrast]:bg-black/75 data-[theme=high-contrast]:backdrop-blur-none"
            onClick={closeMobile}
            data-testid="mobile-overlay"
          />

          <div className="hc:border-2 border-border bg-card text-card-foreground relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-l shadow-xl transition-all duration-300 data-[theme=high-contrast]:border-2">
            <div className="px-4 pt-5 pb-4">
              <div className="mb-6 flex items-center justify-between">
                {branding}
                <AtomButton
                  data-testid="mobile-close-btn"
                  variant="ghost"
                  size="sm"
                  onClick={closeMobile}
                  aria-label="Close menu"
                >
                  <X className="text-foreground h-5 w-5" />
                </AtomButton>
              </div>

              <div className="space-y-1">
                {items.map((item) => (
                  <MoleculeNavAccordion
                    key={item.label}
                    item={item}
                    isOpen={isOpen(item.label)}
                    onToggle={() => toggleAccordion(item.label)}
                    onNavigate={closeMobile}
                  />
                ))}
              </div>

              <div className="border-border mt-6 border-t pt-6">
                {themeToggle}
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="sr-only">organism-navigation</span>
    </nav>
  )
}

export default OrganismNavigation
