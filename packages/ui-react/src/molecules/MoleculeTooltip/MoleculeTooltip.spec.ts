import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MoleculeTooltip, { type MoleculeTooltipProps } from './MoleculeTooltip'
import meta, { Default, PositionBottom, FastDelay } from './MoleculeTooltip.stories'

const getProps = (storyArgs?: Partial<MoleculeTooltipProps>): MoleculeTooltipProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeTooltipProps
}

describe('MoleculeTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 120 })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 40 })
    HTMLElement.prototype.getBoundingClientRect = vi.fn(
      () =>
        ({
          width: 80,
          height: 24,
          top: 100,
          left: 100,
          bottom: 124,
          right: 180,
        }) as DOMRect,
    )
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders root hover container elements cleanly with default configurations', () => {
    const childNode = React.createElement('span', null, 'Hover Content Target')
    render(React.createElement(MoleculeTooltip, getProps(Default.args), childNode))

    const trigger = screen.getByTestId('molecule-tooltip-trigger')
    expect(trigger).toBeDefined()
    expect(trigger.textContent).toContain('Hover Content Target')
  })

  it('mounts hidden elements securely and mounts panels when hovering trigger targets', async () => {
    const childNode = React.createElement('button', null, 'Target')
    render(React.createElement(MoleculeTooltip, getProps(Default.args), childNode))

    expect(screen.queryByTestId('tooltip-content')).toBeNull()

    const trigger = screen.getByTestId('molecule-tooltip-trigger')

    fireEvent.mouseEnter(trigger)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    const tooltip = screen.getByTestId('tooltip-content')
    expect(tooltip).toBeDefined()
    expect(tooltip.textContent).toContain('Tax Information Override')
  })

  it('triggers visibility exit timeout loops gracefully when unhovering', () => {
    const childNode = React.createElement('button', null, 'Target')
    render(React.createElement(MoleculeTooltip, getProps(FastDelay.args), childNode))

    const trigger = screen.getByTestId('molecule-tooltip-trigger')

    fireEvent.mouseEnter(trigger)
    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByTestId('tooltip-content')).toBeDefined()

    fireEvent.mouseLeave(trigger)

    act(() => {
      vi.advanceTimersByTime(20)
    })
    expect(screen.getByTestId('tooltip-content')).toBeDefined()

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(screen.queryByTestId('tooltip-content')).toBeNull()
  })

  it('accepts orientation positions parameters precisely matching interface properties', () => {
    const childNode = React.createElement('button', null, 'Target')
    render(React.createElement(MoleculeTooltip, getProps(PositionBottom.args), childNode))

    const trigger = screen.getByTestId('molecule-tooltip-trigger')
    fireEvent.mouseEnter(trigger)
    act(() => {
      vi.advanceTimersByTime(0)
    })

    const arrow = screen.getByTestId('tooltip-arrow')
    expect(arrow.className).toContain('border-b-card')
  })
})
