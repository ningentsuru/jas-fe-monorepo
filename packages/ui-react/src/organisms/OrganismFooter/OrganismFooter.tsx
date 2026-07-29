import { useMemo, type ReactNode } from 'react'

export interface OrganismFooterProps {
  title?: string
  children?: ReactNode
}

export const OrganismFooter = ({
  title = '',
  children
}: OrganismFooterProps) => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer
      className="organism-footer border-border bg-background mx-auto w-full border-t py-8"
      data-testid="organism-footer"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-start gap-1">
          {title && (
            <h2 data-testid="footer-title" className="text-foreground text-lg font-semibold">
              {title}
            </h2>
          )}
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {children}
        </div>
      </div>
      <span className="sr-only">organism-footer</span>
    </footer>
  )
}

export default OrganismFooter
