import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import OrganismNavigation, { type OrganismNavigationProps } from './OrganismNavigation'
import meta, { Default } from './OrganismNavigation.stories'

let capturedItemsList: any[] = []

vi.mock('../../', () => ({
  AtomButton: ({ children, onClick, 'data-testid': testId }: any) =>
    React.createElement('button', { type: 'button', onClick, 'data-testid': testId }, children),
  MoleculeNavDropdown: ({ item, index, isOpen }: any) => {
    capturedItemsList.push(item)
    return React.createElement(
      'div',
      { 'data-testid': 'mock-dropdown', 'data-index': index, 'data-open': isOpen },
      item.label,
    )
  },
  MoleculeNavAccordion: ({ item, isOpen }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'mock-accordion', 'data-open': isOpen },
      item.label,
    ),
}))

const getProps = (storyArgs?: Partial<OrganismNavigationProps>): OrganismNavigationProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismNavigationProps
}

describe('OrganismNavigation', () => {
  beforeEach(() => {
    capturedItemsList = []
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders root navigation wrapper component correctly', () => {
    render(React.createElement(OrganismNavigation, getProps(Default.args)))

    const nav = screen.getByTestId('organism-navigation')
    expect(nav).toBeDefined()
    expect(screen.getByText('organism-navigation')).toBeDefined()
  })

  it('receives correct structural items array matching Storybook configurations', () => {
    render(React.createElement(OrganismNavigation, getProps(Default.args)))

    expect(capturedItemsList.length).toBe(4)
    expect(capturedItemsList[1].label).toBe('Services Matrix')
  })

  it('handles rendering loop iterations for desktop dropdown child elements cleanly', () => {
    render(React.createElement(OrganismNavigation, getProps(Default.args)))

    const dropdowns = screen.getAllByTestId('mock-dropdown')
    expect(dropdowns.length).toBe(4)
  })

  it('toggles mobile drawer overlay visibility attributes smoothly on menu button interaction triggers', () => {
    render(React.createElement(OrganismNavigation, getProps(Default.args)))

    expect(screen.queryByTestId('mobile-dialog')).toBeNull()

    const openBtn = screen.getByTestId('mobile-open-btn')
    fireEvent.click(openBtn)

    const dialog = screen.getByTestId('mobile-dialog')
    expect(dialog).toBeDefined()
    expect(document.body.style.overflow).toBe('hidden')

    const closeBtn = screen.getByTestId('mobile-close-btn')
    fireEvent.click(closeBtn)

    expect(screen.queryByTestId('mobile-dialog')).toBeNull()
    expect(document.body.style.overflow).toBe('')
  })
})
