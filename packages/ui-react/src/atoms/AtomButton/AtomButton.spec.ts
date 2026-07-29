import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AtomButton from './AtomButton'
import meta, { Default, Disabled, ExternalLink } from './AtomButton.stories'

type AtomButtonProps = React.ComponentProps<typeof AtomButton>

const getProps = (storyArgs: typeof Default.args): AtomButtonProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomButtonProps
}

describe('AtomButton', () => {
  it('renders child text content slots correctly inside the component markup', () => {
    const props = { ...getProps(Default.args), children: 'Click Action' }
    render(React.createElement(AtomButton, props))

    const button = screen.getByTestId('atom-button')
    expect(button).not.toBeNull()
    expect(button.textContent).toBe('Click Action')
  })

  it('applies standard sizing and modifier classes properly based on props', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomButton, props))

    const button = screen.getByTestId('atom-button')
    expect(button.classList.contains('h-10')).toBe(true)
    expect(button.classList.contains('px-4')).toBe(true)
  })

  it('handles polymorphic conversion to standard anchor elements if href is present', () => {
    const props = getProps(ExternalLink.args)
    render(React.createElement(AtomButton, props))

    const anchor = screen.getByTestId('atom-button')
    expect(anchor.tagName.toLowerCase()).toBe('a')
    expect(anchor.getAttribute('href')).toBe('https://google.com')
    expect(anchor.getAttribute('target')).toBe('_blank')
  })

  it('blocks pointer triggers and updates accessibility properties when disabled', () => {
    const clickSpy = vi.fn()
    const props = { ...getProps(Disabled.args), onClick: clickSpy }
    render(React.createElement(AtomButton, props))

    const button = screen.getByTestId('atom-button')
    expect(button.tagName.toLowerCase()).toBe('button')
    expect(button.getAttribute('disabled')).not.toBeNull()
    expect(button.getAttribute('aria-disabled')).toBe('true')

    fireEvent.click(button)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('bubbles component click events upward when action triggers fire', () => {
    const clickSpy = vi.fn()
    const props = { ...getProps(Default.args), onClick: clickSpy }
    render(React.createElement(AtomButton, props))

    const button = screen.getByTestId('atom-button')
    fireEvent.click(button)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
