import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TemplateDefaultPortfolio, {
  type TemplateDefaultPortfolioProps,
} from './TemplateDefaultPortfolio'

const getProps = (
  storyArgs?: Partial<TemplateDefaultPortfolioProps>,
): TemplateDefaultPortfolioProps => {
  return {
    ...storyArgs,
  } as TemplateDefaultPortfolioProps
}

describe('TemplateDefaultPortfolio', () => {
  it('renders root container layout structure and nested slots cleanly', () => {
    const mockHeader = React.createElement(
      'header',
      { 'data-testid': 'mock-header' },
      'Mock Header',
    )
    const mockBody = React.createElement(
      'main',
      { 'data-testid': 'mock-body' },
      'Mock Content Body',
    )
    const mockFooter = React.createElement(
      'footer',
      { 'data-testid': 'mock-footer' },
      'Mock Footer',
    )

    render(
      React.createElement(
        TemplateDefaultPortfolio,
        getProps({ header: mockHeader, footer: mockFooter }),
        mockBody,
      ),
    )

    const root = screen.getByTestId('template-default-portfolio')
    const header = screen.getByTestId('mock-header')
    const body = screen.getByTestId('mock-body')
    const footer = screen.getByTestId('mock-footer')

    expect(root).toBeDefined()
    expect(document.body.contains(root)).toBe(true)
    expect(screen.getByText('template-default-portfolio')).toBeDefined()

    expect(header.textContent).toBe('Mock Header')
    expect(body.textContent).toBe('Mock Content Body')
    expect(footer.textContent).toBe('Mock Footer')
  })
})
