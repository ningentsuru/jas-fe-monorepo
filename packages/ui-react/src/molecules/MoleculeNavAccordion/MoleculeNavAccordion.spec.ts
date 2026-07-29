import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MoleculeNavAccordion, { type MoleculeNavAccordionProps } from './MoleculeNavAccordion'
import meta, { Default, ExpandedDropdown, SingleLinkNoChildren } from './MoleculeNavAccordion.stories'

vi.mock('../../', () => ({
  AtomIcon: ({ className, size }: { className?: string; size: string }) =>
    React.createElement('span', { 'data-testid': 'mock-icon', 'data-size': size, className }, 'icon'),
  AtomNavLink: ({ label, to, onClick, trailing }: { label: string; to?: string; onClick?: (e: any) => void; trailing?: React.ReactNode }) =>
    React.createElement(
      'button',
      { type: 'button', onClick, 'data-testid': 'mock-nav-link', 'data-label': label, 'data-to': to },
      React.createElement('span', null, label),
      trailing
    )
}))

const getProps = (storyArgs?: Partial<MoleculeNavAccordionProps>): MoleculeNavAccordionProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeNavAccordionProps
}

describe('MoleculeNavAccordion', () => {
  it('renders root layout block and primary labels accurately', () => {
    render(React.createElement(MoleculeNavAccordion, getProps(Default.args)))

    const root = screen.getByTestId('molecule-nav-accordion')
    expect(root).toBeDefined()
    expect(document.body.contains(root)).toBe(true)
    expect(screen.getByText('Engineering Space')).toBeDefined()
  })

  it('verifies configuration props pass through securely matching types', () => {
    render(React.createElement(MoleculeNavAccordion, getProps(ExpandedDropdown.args)))

    const panel = screen.getByTestId('accordion-panel')
    expect(panel.classList.contains('visible')).toBe(true)
    expect(panel.classList.contains('grid-rows-[1fr]')).toBe(true)
  })

  it('renders sub-item list mapping nodes correctly when children are present', () => {
    render(React.createElement(MoleculeNavAccordion, getProps(ExpandedDropdown.args)))

    const navLinks = screen.getAllByTestId('mock-nav-link')
    expect(navLinks.length).toBe(4)
    expect(screen.getByText('Component Atoms')).toBeDefined()
    expect(screen.getByText('Molecules Matrix')).toBeDefined()
  })

  it('hides transition panel grids from view when marked closed', () => {
    render(React.createElement(MoleculeNavAccordion, getProps(Default.args)))

    const panel = screen.getByTestId('accordion-panel')
    expect(panel.classList.contains('grid-rows-[0fr]')).toBe(true)
    expect(panel.classList.contains('invisible')).toBe(true)
    expect(panel.classList.contains('opacity-0')).toBe(true)
  })

  it('updates panel class attributes to track visibility states when open', () => {
    render(React.createElement(MoleculeNavAccordion, getProps(ExpandedDropdown.args)))

    const panel = screen.getByTestId('accordion-panel')
    expect(panel.classList.contains('grid-rows-[1fr]')).toBe(true)
    expect(panel.classList.contains('visible')).toBe(true)
    expect(panel.classList.contains('opacity-100')).toBe(true)
  })

  it('bubbles a toggle execution request upward when clicking items with child references', () => {
    const handleToggle = vi.fn()
    const handleNavigate = vi.fn()

    render(
      React.createElement(MoleculeNavAccordion, getProps({
        ...Default.args,
        onToggle: handleToggle,
        onNavigate: handleNavigate,
      }))
    )

    const rootLink = screen.getAllByTestId('mock-nav-link')[0]
    fireEvent.click(rootLink)

    expect(handleToggle).toHaveBeenCalledTimes(1)
    expect(handleNavigate).not.toHaveBeenCalled()
  })

  it('bubbles navigate triggers straight out if a basic single link configuration is activated', () => {
    const handleToggle = vi.fn()
    const handleNavigate = vi.fn()

    render(
      React.createElement(MoleculeNavAccordion, getProps({
        ...SingleLinkNoChildren.args,
        onToggle: handleToggle,
        onNavigate: handleNavigate,
      }))
    )

    const rootLink = screen.getAllByTestId('mock-nav-link')[0]
    fireEvent.click(rootLink)

    expect(handleNavigate).toHaveBeenCalledTimes(1)
    expect(handleToggle).not.toHaveBeenCalled()
  })
})
