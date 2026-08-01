// src/app/layout-client.tsx
'use client'

import { Suspense } from 'react'
import { useAppTheme } from '@/hooks/useAppTheme'
import {
  TemplateDefaultPortfolio,
  OrganismHeader,
  MoleculeThemeToggle,
  OrganismFooter,
  AtomButton,
  AtomWordSwap,
} from '@repo/ui-react'
import { NavItem } from '@/types'
import type { Themes } from '@/types'

interface LayoutClientProps {
  children: React.ReactNode
  navItems: NavItem[]
}

export function LayoutClient({ children, navItems }: LayoutClientProps) {
  const { theme, toggleTheme, isDark, setTheme, isMounted } = useAppTheme()

  return (
    <TemplateDefaultPortfolio
      data-testid="default-layout"
      header={
        <OrganismHeader
          navItems={navItems}
          branding={
            <AtomButton href="/" className="shrink-0 p-0!">
              <h1 className="text-foreground flex items-center justify-center text-lg font-semibold">
                <span className="hidden sm:inline">Your N</span>
                <span className="sm:hidden">N</span>
                <AtomWordSwap words={['u', 'e']} interval={2000} transition="slide-down" />
                <span className="hidden sm:inline">xt Frontend Developer</span>
                <span className="sm:hidden">xt Developer</span>
              </h1>
            </AtomButton>
          }
          themeToggle={
            isMounted ? (
              <MoleculeThemeToggle
                isToggled={isDark}
                currentTheme={theme as Themes}
                onToggle={toggleTheme}
                onSetTheme={(t) => setTheme(t as Themes)}
              />
            ) : (
              <div className="h-10 w-10" aria-hidden="true" />
            )
          }
        />
      }
      footer={
        <OrganismFooter title="This is footer">
          <div>Note: By holding the theme toggle you can choose different themes.</div>
          <div>Todo: Add contact me component here.</div>
        </OrganismFooter>
      }
    >
      <Suspense
        fallback={
          <main className="flex h-screen w-screen items-center justify-center">
            Loading data...
          </main>
        }
      >
        <main className="container mx-auto flex h-full min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </Suspense>
    </TemplateDefaultPortfolio>
  )
}
