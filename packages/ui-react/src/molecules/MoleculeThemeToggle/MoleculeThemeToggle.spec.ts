import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MoleculeThemeToggle, { type MoleculeThemeToggleProps } from './MoleculeThemeToggle'
import meta, { Default, DarkModeActive, CustomForestTheme } from './MoleculeThemeToggle.stories'

vi.mock('../../', () => ({
  AtomToggle: ({ icon: Icon, onToggle, onLongToggle }: any) =>
    React.createElement('button', {
      type: 'button',
      'data-testid': 'mock-toggle-btn',
      'data-icon-name': Icon?.name || Icon?.displayName || 'UnknownIcon',
      onClick: onToggle,
      onContextMenu: (e: any) => { e.preventDefault(); onLongToggle(); }
    }, 'Toggle'),
  AtomSelect: ({ value, options, onUpdateModelValue }: any) =>
    React.createElement('select', {
      'data-testid': 'mock-select',
      value,
      onChange: (e: any) => onUpdateModelValue(e.target.value)
    }, options.map((opt: any) => React.createElement('option', { key: opt.value, value: opt.value }, opt.label))),
  AtomButton: ({ children, type, onClick }: any) =>
    React.createElement('button', { type: type || 'button', onClick, 'data-testid': `mock-btn-${type || 'button'}` }, children),
  MoleculeModal: ({ children, show, title }: any) =>
    show ? React.createElement('div', { 'data-testid': 'molecule-modal', 'data-title': title }, children) : null
}))

const getProps = (storyArgs?: Partial<MoleculeThemeToggleProps>): MoleculeThemeToggleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeThemeToggleProps
}

describe('MoleculeThemeToggle', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders core container toggle layout structures correctly', () => {
    render(React.createElement(MoleculeThemeToggle, getProps(Default.args)))

    const wrapper = screen.getByTestId('molecule-theme-toggle')
    expect(wrapper).toBeDefined()
    expect(screen.getByText('molecule-theme-toggle')).toBeDefined()
  })

  it('receives correct structural props passed down from Storybook arguments and toggles appropriately', () => {
    const handleToggle = vi.fn()
    render(React.createElement(MoleculeThemeToggle, getProps({
      ...DarkModeActive.args,
      onToggle: handleToggle
    })))

    const btn = screen.getByTestId('mock-toggle-btn')
    fireEvent.click(btn)
    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('bubbles primary click toggle notifications upward when tap actions fire', () => {
    const handleToggle = vi.fn()
    render(React.createElement(MoleculeThemeToggle, getProps({
      ...Default.args,
      onToggle: handleToggle
    })))

    const btn = screen.getByTestId('mock-toggle-btn')
    fireEvent.click(btn)

    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('mounts and displays modal theme lists after triggering long-toggle hooks', () => {
    const handleLongToggle = vi.fn()
    render(React.createElement(MoleculeThemeToggle, getProps({
      ...Default.args,
      onLongToggle: handleLongToggle
    })))

    const btn = screen.getByTestId('mock-toggle-btn')

    fireEvent.contextMenu(btn)

    const modalElement = screen.getByTestId('molecule-modal')
    expect(modalElement).toBeDefined()
    expect(modalElement.getAttribute('data-title')).toBe('Choose more themes!')
    expect(handleLongToggle).toHaveBeenCalledTimes(1)
  })

  it('changes primary display icon layout choices dynamically depending on current active themes', () => {
    const { rerender } = render(React.createElement(MoleculeThemeToggle, getProps(Default.args)))
    const lightBtn = screen.getByTestId('mock-toggle-btn')
    const lightIcon = lightBtn.getAttribute('data-icon-name')

    rerender(React.createElement(MoleculeThemeToggle, getProps(CustomForestTheme.args)))
    const forestBtn = screen.getByTestId('mock-toggle-btn')
    const forestIcon = forestBtn.getAttribute('data-icon-name')

    expect(lightIcon).not.toEqual(forestIcon)
  })
})
