import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrganismHeader, { type OrganismHeaderProps } from './OrganismHeader'
import meta, { Default, EmptyNavigationShell } from './OrganismHeader.stories'

let capturedNavItems: any = null

vi.mock('../../', () => ({
  OrganismNavigation: ({ items }: { items: any }) => {
    capturedNavItems = items
    return React.createElement('nav', { 'data-testid': 'mock-navigation' }, 'Navigation Inner Context')
  }
}))

const getProps = (storyArgs?: Partial<OrganismHeaderProps>): OrganismHeaderProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismHeaderProps
}

describe('OrganismHeader', () => {
  it('renders root semantic structure layout context elements correctly', () => {
    render(React.createElement(OrganismHeader, getProps(Default.args)))

    const header = screen.getByTestId('organism-header')
    expect(header).toBeDefined()
    expect(header.classList.contains('sticky')).toBe(true)
    expect(header.classList.contains('bg-card')).toBe(true)
  })

  it('pipes navigational array payload items data properties downwards securely', () => {
    capturedNavItems = null
    render(React.createElement(OrganismHeader, getProps(Default.args)))

    expect(capturedNavItems).not.toBeNull()
    expect(capturedNavItems.length).toBe(3)
    expect(capturedNavItems[0].label).toBe('Dashboard')
  })

  it('supplies fallback array structures safely when props contain empty elements', () => {
    capturedNavItems = null
    render(React.createElement(OrganismHeader, getProps(EmptyNavigationShell.args)))

    expect(capturedNavItems).toEqual([])
  })

  it('renders branding template slots context details within the header layout accurately', () => {
    const brandingNode = React.createElement('span', { 'data-testid': 'logo-mock' }, 'Core Brand Logo')

    render(
      React.createElement(OrganismHeader, getProps(Default.args), null)
    )
    render(
      React.createElement(OrganismHeader, getProps({
        ...Default.args,
        branding: brandingNode
      }))
    )

    const brandingEl = screen.getByTestId('logo-mock')
    expect(brandingEl).toBeDefined()
    expect(brandingEl.textContent).toBe('Core Brand Logo')
  })

  it('mounts auxiliary items through the named theme-toggle component configuration slots', () => {
    const toggleNode = React.createElement('div', { 'data-testid': 'toggle-mock' }, 'Theme Action Button')

    render(
      React.createElement(OrganismHeader, getProps({
        ...Default.args,
        themeToggle: toggleNode
      }))
    )

    const container = screen.getByTestId('theme-toggle-container')
    const innerToggle = screen.getByTestId('toggle-mock')

    expect(container).toBeDefined()
    expect(innerToggle.textContent).toBe('Theme Action Button')
  })
})
