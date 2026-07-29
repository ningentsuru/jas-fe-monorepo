import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AtomInput from './AtomInput'
import meta, { Default, ErrorState, CustomNumericSize } from './AtomInput.stories'

type AtomInputProps = React.ComponentProps<typeof AtomInput>

const getProps = (storyArgs: typeof Default.args): AtomInputProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomInputProps
}

describe('AtomInput', () => {
  it('binds and renders properties and value mutations correctly inside the document tree', () => {
    const props = getProps({
      ...Default.args,
      modelValue: 'Monorepo Stack',
      placeholder: 'Search modules...',
    })
    render(React.createElement(AtomInput, props))

    const input = screen.getByTestId('atom-input') as HTMLInputElement
    expect(input.value).toBe('Monorepo Stack')
    expect(input.getAttribute('placeholder')).toBe('Search modules...')
  })

  it('bubbles text mutation data frames upward via standard update emitters', () => {
    const updateSpy = vi.fn()
    const props = { ...getProps(Default.args), onUpdateModelValue: updateSpy }
    render(React.createElement(AtomInput, props))

    const input = screen.getByTestId('atom-input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'FSD Architecture' } })

    expect(updateSpy).toHaveBeenCalledWith('FSD Architecture')
  })

  it('applies error structural color variables when active validation parameters catch blocks', () => {
    const props = getProps(ErrorState.args)
    render(React.createElement(AtomInput, props))

    const input = screen.getByTestId('atom-input')
    expect(input.classList.contains('border-destructive')).toBe(true)
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('renders side slot icon templates cleanly when containers are supplied', () => {
    const prefixNode = React.createElement('span', { className: 'mock-prefix', 'data-testid': 'mock-prefix' }, 'LINK')
    const props = { ...getProps(Default.args), prefix: prefixNode }
    render(React.createElement(AtomInput, props))

    const prefixElement = screen.getByTestId('mock-prefix')
    expect(prefixElement).not.toBeNull()

    const input = screen.getByTestId('atom-input')
    expect(input.classList.contains('pl-10')).toBe(true)
  })

  it('injects style variables perfectly when explicit numerical sizing values match', () => {
    const props = getProps(CustomNumericSize.args)
    render(React.createElement(AtomInput, props))

    const input = screen.getByTestId('atom-input')
    const domElement = input as HTMLElement

    expect(input.classList.contains('h-[var(--input-size)]')).toBe(true)
    expect(domElement.style.getPropertyValue('--input-size')).toBe('55px')
  })
})
