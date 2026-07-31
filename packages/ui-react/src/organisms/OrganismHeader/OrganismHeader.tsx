'use client'

import { type ReactNode } from 'react'
import { OrganismNavigation } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export interface OrganismHeaderProps {
  navItems?: NavItem[]
  branding?: ReactNode
  themeToggle?: ReactNode
}

export const OrganismHeader = ({
  navItems = [],
  branding,
  themeToggle
}: OrganismHeaderProps) => {
  return (
    <header
      className="border-border bg-card sticky top-0 z-50 h-16 w-full border-b"
      data-testid="organism-header"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {branding}

        <div className="flex items-center justify-between gap-4">
          <OrganismNavigation items={navItems} />

          <div className="border-border border-l pl-4" data-testid="theme-toggle-container">
            {themeToggle}
          </div>
        </div>
      </div>
    </header>
  )
}

export default OrganismHeader
