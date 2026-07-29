import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrganismFooter, { type OrganismFooterProps } from './OrganismFooter'
import meta, { Default, AlternativeTitle } from './OrganismFooter.stories'

const getProps = (storyArgs?: Partial<OrganismFooterProps>): OrganismFooterProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismFooterProps
}

describe('OrganismFooter', () => {
  it('renders root semantic layout structure and title text content properly', () => {
    render(React.createElement(OrganismFooter, getProps(Default.args)))

    const currentYear = new Date().getFullYear().toString()
    const footer = screen.getByTestId('organism-footer')
    const title = screen.getByTestId('footer-title')

    expect(footer).toBeDefined()
    expect(document.body.contains(footer)).toBe(true)
    expect(title.textContent).toBe('Core Design System Inc.')
    expect(footer.textContent).toContain(currentYear)
    expect(footer.textContent).toContain('All rights reserved.')
  })

  it('receives correct configuration title props from Storybook arguments mapping blocks', () => {
    render(React.createElement(OrganismFooter, getProps(AlternativeTitle.args)))

    const title = screen.getByTestId('footer-title')
    expect(title.textContent).toBe('Monorepo Platform Footer Layer')
  })

  it('renders child context template node slots smoothly inside the container layout layer', () => {
    const childNode = React.createElement('span', { 'data-testid': 'mock-nav' }, 'Footer Nav Elements')

    render(React.createElement(OrganismFooter, getProps(Default.args), childNode))

    const slottedEl = screen.getByTestId('mock-nav')
    expect(slottedEl).toBeDefined()
    expect(slottedEl.textContent).toBe('Footer Nav Elements')
  })
})
