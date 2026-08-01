import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import AtomMorseKey, { type AtomMorseKeyProps } from './AtomMorseKey'
import meta, { Default } from './AtomMorseKey.stories'

const getProps = (storyArgs?: Partial<AtomMorseKeyProps>): AtomMorseKeyProps => {
  return {
    onDot: vi.fn(),
    onDash: vi.fn(),
    ...meta.args,
    ...storyArgs,
  } as AtomMorseKeyProps
}

describe('AtomMorseKey', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders structural labels accurately on initial mount', () => {
    render(React.createElement(AtomMorseKey, getProps(Default.args)))

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement
    expect(keyElement.textContent).toContain('SIGNAL')
    expect(keyElement.textContent).toContain('Telegraph Key')
  })

  it('triggers onDot callback accurately if pointer is released before timeout', async () => {
    const props = getProps({ signalDelay: 100 })
    render(React.createElement(AtomMorseKey, props))

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(100)
    })
    fireEvent.pointerUp(keyElement)

    expect(props.onDot).toHaveBeenCalledTimes(1)
    expect(props.onDash).not.toHaveBeenCalled()
  })

  it('triggers onDash callback accurately if key hold duration surpasses timeout threshold', async () => {
    const props = getProps({ signalDelay: 250 })
    render(React.createElement(AtomMorseKey, props))

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(300)
    })
    fireEvent.pointerUp(keyElement)

    expect(props.onDash).toHaveBeenCalledTimes(1)
    expect(props.onDot).not.toHaveBeenCalled()
  })
})
