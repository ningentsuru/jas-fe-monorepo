import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AtomNavLink from './AtomNavLink'
import meta, {
  Default,
  ActiveLink,
  CustomNumericSize,
  RouterLinkVariant,
} from './AtomNavLink.stories'

type AtomNavLinkProps = React.ComponentProps<typeof AtomNavLink>

const getProps = (storyArgs: typeof Default.args): AtomNavLinkProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomNavLinkProps
}

describe('AtomNavLink', () => {
  it('renders label text contents correctly', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomNavLink, props))

    const linkElement = screen.getByTestId('atom-button')
    expect(linkElement).not.toBeNull()
    expect(linkElement.textContent).toContain('Dashboard Overview')
  })

  it('applies text-primary styling only when marked as active', () => {
    const defaultProps = getProps(Default.args)
    const activeProps = getProps(ActiveLink.args)

    const { unmount } = render(React.createElement(AtomNavLink, defaultProps))
    let linkElement = screen.getByTestId('atom-button')
    expect(linkElement.classList.contains('text-foreground')).toBe(true)
    expect(linkElement.classList.contains('text-primary')).toBe(false)
    unmount()

    render(React.createElement(AtomNavLink, activeProps))
    linkElement = screen.getByTestId('atom-button')
    expect(linkElement.classList.contains('text-primary')).toBe(true)
  })

  it('safely pipes downstream custom numeric sizes to internal button mechanisms', () => {
    const props = getProps(CustomNumericSize.args)
    render(React.createElement(AtomNavLink, props))

    const linkElement = screen.getByTestId('atom-button')
    expect(linkElement.style.getPropertyValue('--button-size')).toBe('52px')
  })

  it('passes routing properties directly down to the core layout layers', () => {
    const props = getProps(RouterLinkVariant.args)
    render(React.createElement(AtomNavLink, props))

    const linkElement = screen.getByTestId('atom-button')
    expect(linkElement.getAttribute('href')).toBe('/settings')
  })

  it('renders injected markup content via the named trailing slot structure', () => {
    const trailingNode = React.createElement('span', { className: 'badge-mock', 'data-testid': 'badge-mock' }, 'Icon')
    const props = { ...getProps(Default.args), trailing: trailingNode }
    render(React.createElement(AtomNavLink, props))

    const badge = screen.getByTestId('badge-mock')
    expect(badge).not.toBeNull()
    expect(badge.textContent).toBe('Icon')
  })

  it('bubbles inner click triggers upward seamlessly', () => {
    const clickSpy = vi.fn()
    const props = { ...getProps(Default.args), onClick: clickSpy }
    render(React.createElement(AtomNavLink, props))

    const linkElement = screen.getByTestId('atom-button')
    fireEvent.click(linkElement)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
