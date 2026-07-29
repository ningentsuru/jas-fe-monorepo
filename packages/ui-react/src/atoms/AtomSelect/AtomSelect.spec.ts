import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AtomSelect from './AtomSelect'
import meta, { Default, ValidationError, CustomNumericSize } from './AtomSelect.stories'

type AtomSelectProps = React.ComponentProps<typeof AtomSelect>

const getProps = (storyArgs: typeof Default.args): AtomSelectProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomSelectProps
}

describe('AtomSelect', () => {
  it('renders dropdown placeholder and payload option lists cleanly', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomSelect, props))

    const select = screen.getByTestId('atom-select') as HTMLSelectElement
    expect(select).not.toBeNull()
    expect(select.value).toBe('')

    const options = select.options
    expect(options.length).toBe(5)
    expect(options[1].textContent).toBe('Vue.js Framework')
  })

  it('handles value assignment states and options disability states accurately', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomSelect, props))

    const select = screen.getByTestId('atom-select') as HTMLSelectElement
    const options = select.options

    expect(options[1].disabled).toBe(false)
    expect(options[3].disabled).toBe(true)
  })

  it('bubbles update triggers upward when choice parameters mutate', () => {
    const updateSpy = vi.fn()
    const props = { ...getProps(Default.args), onUpdateModelValue: updateSpy }
    render(React.createElement(AtomSelect, props))

    const select = screen.getByTestId('atom-select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'react' } })

    expect(updateSpy).toHaveBeenCalledWith('react')
  })

  it('applies error modifier classes and accessibility descriptors when validated', () => {
    const props = getProps(ValidationError.args)
    render(React.createElement(AtomSelect, props))

    const select = screen.getByTestId('atom-select')
    expect(select.classList.contains('border-destructive')).toBe(true)
    expect(select.getAttribute('aria-invalid')).toBe('true')
  })

  it('maps custom pixel variable structures perfectly when numeric sizes are matched', () => {
    const props = getProps(CustomNumericSize.args)
    render(React.createElement(AtomSelect, props))

    const select = screen.getByTestId('atom-select') as HTMLElement
    expect(select.classList.contains('h-[var(--select-size)]')).toBe(true)
    expect(select.style.getPropertyValue('--select-size')).toBe('58px')
  })
})
