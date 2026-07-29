import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AtomIcon from './AtomIcon'
import meta, { Default, TextFallbackState, CustomNumericSize } from './AtomIcon.stories'

type AtomIconProps = React.ComponentProps<typeof AtomIcon>

const getProps = (storyArgs: typeof Default.args): AtomIconProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomIconProps
}

describe('AtomIcon', () => {
  it('renders a custom dynamic icon component correctly when passed down', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomIcon, props))

    const iconContainer = screen.getByTestId('atom-icon')
    expect(iconContainer).not.toBeNull()

    const svgElement = iconContainer.querySelector('svg')
    expect(svgElement).not.toBeNull()
  })

  it('falls back seamlessly to rendering text spans if component object is missing', () => {
    const props = getProps(TextFallbackState.args)
    render(React.createElement(AtomIcon, props))

    const iconContainer = screen.getByTestId('atom-icon')
    expect(iconContainer.textContent).toContain('Fallback Text')

    const svgElement = iconContainer.querySelector('svg')
    expect(svgElement).toBeNull()
  })

  it('safely pipes pixel sizing attributes as custom inline CSS variables when numbers match', () => {
    const props = getProps(CustomNumericSize.args)
    render(React.createElement(AtomIcon, props))

    const iconContainer = screen.getByTestId('atom-icon')
    expect(iconContainer.style.getPropertyValue('--icon-size')).toBe('48px')
  })
})
