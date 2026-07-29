import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AtomAvatar from './AtomAvatar'
import meta, { Default, Squared, CustomNumericSize } from './AtomAvatar.stories'

type AtomAvatarProps = React.ComponentProps<typeof AtomAvatar>

const getProps = (storyArgs: typeof Default.args): AtomAvatarProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomAvatarProps
}

describe('AtomAvatar', () => {
  it('renders matching initials properly from the username string data input', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomAvatar, props))

    const element = screen.getByTestId('atom-avatar')
    expect(element).not.toBeNull()
    expect(element.textContent).toBe('JO')
  })

  it('renders a generic placeholder fallback for missing username states', () => {
    const props = getProps({
      ...Default.args,
      username: '  ',
    })
    render(React.createElement(AtomAvatar, props))

    const element = screen.getByTestId('atom-avatar')
    expect(element.textContent).toBe('??')
  })

  it('toggles border curvature styles correctly dynamically based on the round flag status', () => {
    const roundProps = getProps(Default.args)
    const squareProps = getProps(Squared.args)

    const { unmount } = render(React.createElement(AtomAvatar, roundProps))
    let element = screen.getByTestId('atom-avatar')
    expect(element.classList.contains('rounded-full')).toBe(true)
    unmount()

    render(React.createElement(AtomAvatar, squareProps))
    element = screen.getByTestId('atom-avatar')
    expect(element.classList.contains('rounded-md')).toBe(true)
  })

  it('safely registers layout size overrides via inline CSS variables when numbers are detected', () => {
    const props = getProps(CustomNumericSize.args)
    render(React.createElement(AtomAvatar, props))

    const element = screen.getByTestId('atom-avatar')
    expect(element.classList.contains('h-[var(--avatar-size)]')).toBe(true)
    expect(element.style.getPropertyValue('--avatar-size')).toBe('75px')
  })
})
