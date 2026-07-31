'use client'

import { type ReactNode } from 'react'

export interface TemplateDefaultPortfolioProps {
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

export const TemplateDefaultPortfolio = ({
  header,
  footer,
  children
}: TemplateDefaultPortfolioProps) => {
  return (
    <div
      className="template-default-portfolio flex min-h-dvh flex-col"
      data-testid="template-default-portfolio"
    >
      {header}

      <div className="flex min-h-0 w-full flex-1 flex-col" data-testid="template-body-container">
        {children}
      </div>

      {footer}
      <span className="sr-only">template-default-portfolio</span>
    </div>
  )
}

export default TemplateDefaultPortfolio
