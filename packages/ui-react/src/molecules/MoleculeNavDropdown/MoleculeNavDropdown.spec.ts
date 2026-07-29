import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MoleculeNavDropdown, { type MoleculeNavDropdownProps } from './MoleculeNavDropdown'
import meta, { Default, OpenedDropdown, SingleLinkNoDropdown } from './MoleculeNavDropdown.stories'

vi.mock('../../', () => ({
  AtomIcon: ({ className, size }: { className?: string; size: string }) =>
    React.createElement('span', { 'data-testid': 'mock-icon', 'data-size': size, className }, 'icon'),
  AtomButton: ({ children, onClick, className, to }: { children: React.ReactNode; onClick?: (e: any) => void; className?: string; to?: string }) =>
    React.createElement('button', { type: 'button', onClick, className, 'data-testid': 'mock-button', 'data-to': to }, children),
  AtomNavLink: ({ label, to, onClick }: { label: string; to?: string; onClick?: () => void }) =>
    React.createElement(
      'button',
      { type: 'button', onClick, 'data-testid': 'mock-nav-link', 'data-to': to },
      React.createElement('span', null, label)
    )
}))

const getProps = (storyArgs?: Partial<MoleculeNavDropdownProps>): MoleculeNavDropdownProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeNavDropdownProps
}

describe('MoleculeNavDropdown', () => {
  it('renders dropdown root element and base title labels correctly', () => {
    render(React.createElement(MoleculeNavDropdown, getProps(Default.args)))

    const root = screen.getByTestId('molecule-nav-dropdown')
    expect(root).toBeDefined()
    expect(document.body.contains(root)).toBe(true)
    expect(screen.getByText('Products')).toBeDefined()
  })

  it('receives correct configuration parameters from story inputs and reflects visibility states', () => {
    render(React.createElement(MoleculeNavDropdown, getProps(OpenedDropdown.args)))

    const panel = screen.getByTestId('dropdown-panel')
    expect(panel.classList.contains('visible')).toBe(true)
    expect(panel.classList.contains('scale-100')).toBe(true)
    expect(panel.classList.contains('opacity-100')).toBe(true)
  })

  it('renders child list anchors cleanly through custom AtomNavLink sub-components', () => {
    render(React.createElement(MoleculeNavDropdown, getProps(OpenedDropdown.args)))

    const links = screen.getAllByTestId('mock-nav-link')
    expect(links.length).toBe(3)
    expect(screen.getByText('Web Applications')).toBeDefined()
    expect(screen.getByText('Cloud Architecture')).toBeDefined()
  })

  it('hides popover panels using visibility layout classes when marked closed', () => {
    render(React.createElement(MoleculeNavDropdown, getProps(Default.args)))

    const panel = screen.getByTestId('dropdown-panel')
    expect(panel.classList.contains('invisible')).toBe(true)
    expect(panel.classList.contains('scale-95')).toBe(true)
    expect(panel.classList.contains('opacity-0')).toBe(true)
  })

  it('bubbles structural toggle notifications upward including parameters on click actions', () => {
    const handleToggle = vi.fn()
    render(
      React.createElement(MoleculeNavDropdown, getProps({
        ...Default.args,
        onToggle: handleToggle,
      }))
    )

    const button = screen.getByTestId('mock-button')
    fireEvent.click(button)

    expect(handleToggle).toHaveBeenCalledTimes(1)
    expect(handleToggle).toHaveBeenCalledWith(2)
  })

  it('skips toggle updates entirely if triggering a simple non-dropdown parameter link', () => {
    const handleToggle = vi.fn()
    render(
      React.createElement(MoleculeNavDropdown, getProps({
        ...SingleLinkNoDropdown.args,
        onToggle: handleToggle,
      }))
    )

    const button = screen.getByTestId('mock-button')
    fireEvent.click(button)

    expect(handleToggle).not.toHaveBeenCalled()
  })

  it('bubbles navigate actions when clicking individual dropdown nested option links', () => {
    const handleNavigate = vi.fn()
    render(
      React.createElement(MoleculeNavDropdown, getProps({
        ...OpenedDropdown.args,
        onNavigate: handleNavigate,
      }))
    )

    const childLink = screen.getAllByTestId('mock-nav-link')[0]
    fireEvent.click(childLink)

    expect(handleNavigate).toHaveBeenCalledTimes(1)
  })
})
