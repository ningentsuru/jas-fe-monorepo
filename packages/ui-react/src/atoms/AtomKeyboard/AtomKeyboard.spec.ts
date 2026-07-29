import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AtomKeyboard from './AtomKeyboard'
import meta, { Default } from './AtomKeyboard.stories'

type AtomKeyboardProps = React.ComponentProps<typeof AtomKeyboard>

const getProps = (storyArgs: typeof Default.args): AtomKeyboardProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomKeyboardProps
}

describe('AtomKeyboard', () => {
  it('renders properly using Storybook args', () => {
    const props = getProps(Default.args)
    render(React.createElement(AtomKeyboard, props))

    const keyboard = screen.getByTestId('atom-keyboard')
    expect(keyboard).not.toBeNull()
    expect(keyboard.textContent).toContain('⌘')
    expect(keyboard.textContent).toContain('atom-keyboard')
  })

  it('receives and renders the correct character prop input into the canvas', () => {
    const props = getProps({
      character: 'K',
    })
    render(React.createElement(AtomKeyboard, props))

    const keyboard = screen.getByTestId('atom-keyboard')
    expect(keyboard.textContent).toContain('K')
  })
})
