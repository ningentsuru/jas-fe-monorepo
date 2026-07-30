import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import AtomWordSwap, { type AtomWordSwapProps } from './AtomWordSwap'
import meta, { Default, FastFlipTransition, SingleWordFallback } from './AtomWordSwap.stories'

const getProps = (storyArgs?: Partial<AtomWordSwapProps>): AtomWordSwapProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomWordSwapProps
}

describe('AtomWordSwap', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the initial word configuration parameter accurately on mount', () => {
    render(React.createElement(AtomWordSwap, getProps(Default.args)))

    const container = screen.getByTestId('atom-word-swap')
    expect(container).toBeDefined()
    expect(container.textContent).toContain('Innovative')
  })

  it('receives correct structural configurations from Storybook properties', () => {
    render(React.createElement(AtomWordSwap, getProps(FastFlipTransition.args)))

    const innerSpan = screen.getByTestId('atom-word-swap-inner')
    expect(innerSpan.className).toContain('transition-flip-enter-active')
    expect(innerSpan.style.animation).toContain('swap-flip 0.5s')
  })

  it('advances indices and swaps displayed words dynamically when timer intervals elapse', async () => {
    render(React.createElement(AtomWordSwap, getProps(FastFlipTransition.args)))

    const container = screen.getByTestId('atom-word-swap')
    expect(container.textContent).toContain('Innovative')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(container.textContent).toContain('Performant')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(container.textContent).toContain('Accessible')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })
    expect(container.textContent).toContain('Innovative')
  })

  it('prevents swapping executions completely if the array contains only one item', async () => {
    render(React.createElement(AtomWordSwap, getProps(SingleWordFallback.args)))

    const container = screen.getByTestId('atom-word-swap')
    expect(container.textContent).toContain('Static')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000)
    })
    expect(container.textContent).toContain('Static')
  })

  it('calculates the dynamic maxWidth styling string correctly to fit the longest string', () => {
    render(React.createElement(AtomWordSwap, getProps(Default.args)))

    const container = screen.getByTestId('atom-word-swap')
    expect(container.style.minWidth).toBe('10ch')
  })
})
