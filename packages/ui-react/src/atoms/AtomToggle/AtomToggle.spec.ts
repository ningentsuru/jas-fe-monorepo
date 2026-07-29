import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import AtomToggle, { type AtomToggleProps } from './AtomToggle'
import meta, { Default, ToggledActive, CustomNumericSize } from './AtomToggle.stories'

vi.mock('../../', () => ({
  AtomIcon: ({ icon: Icon, size }: { icon: React.ElementType; size: string | number }) =>
    React.createElement('div', { 'data-testid': 'atom-icon', 'data-size': size },
      React.createElement(Icon, { 'data-testid': 'mocked-lucide-icon' })
    )
}))

const getProps = (storyArgs?: Partial<AtomToggleProps>): AtomToggleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomToggleProps
}

describe('AtomToggle', () => {
  it('renders matching text parameters and sub-elements accurately', () => {
    render(React.createElement(AtomToggle, getProps(Default.args)))

    const button = screen.getByTestId('atom-toggle')
    expect(button).toBeDefined()
    expect(document.body.contains(button)).toBe(true)

    const textNode = screen.getByText('atom-toggle')
    expect(textNode).toBeDefined()
  })

  it('receives and pipes configuration inputs cleanly down the render path', () => {
    render(React.createElement(AtomToggle, getProps(CustomNumericSize.args)))

    const iconWrapper = screen.getByTestId('atom-icon')
    expect(iconWrapper.getAttribute('data-size')).toBe('48')
  })

  it('verifies focus utility class configuration attributes are bound properly', () => {
    render(React.createElement(AtomToggle, getProps(Default.args)))

    const button = screen.getByTestId('atom-toggle')
    expect(button.classList.contains('focus-visible:ring-ring')).toBe(true)
    expect(button.classList.contains('focus-visible:ring-2')).toBe(true)
    expect(button.classList.contains('focus-visible:outline-none')).toBe(true)
  })

  it('receives and binds the active state toggled property correctly', () => {
    render(React.createElement(AtomToggle, getProps(ToggledActive.args)))

    const button = screen.getByTestId('atom-toggle')
    expect(button.classList.contains('atom-toggle--active')).toBe(true)
  })

  it('triggers custom structural click events correctly on standard press interaction', () => {
    const handleToggle = vi.fn()
    const handleLongToggle = vi.fn()

    render(
      React.createElement(AtomToggle, getProps({
        onToggle: handleToggle,
        onLongToggle: handleLongToggle,
      }))
    )

    const button = screen.getByTestId('atom-toggle')

    fireEvent.pointerDown(button)
    fireEvent.pointerUp(button)

    expect(handleToggle).toHaveBeenCalledTimes(1)
    expect(handleLongToggle).not.toHaveBeenCalled()
  })

  it('triggers long press handlers when threshold timers are met', () => {
    vi.useFakeTimers()
    const handleToggle = vi.fn()
    const handleLongToggle = vi.fn()

    render(
      React.createElement(AtomToggle, getProps({
        onToggle: handleToggle,
        onLongToggle: handleLongToggle,
      }))
    )

    const button = screen.getByTestId('atom-toggle')

    fireEvent.pointerDown(button)

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(handleLongToggle).toHaveBeenCalledTimes(1)

    fireEvent.pointerUp(button)
    expect(handleToggle).not.toHaveBeenCalled()

    vi.useRealTimers()
  })
})
