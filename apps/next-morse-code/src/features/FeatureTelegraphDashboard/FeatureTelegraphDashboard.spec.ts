import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import FeatureTelegraphDashboard from './FeatureTelegraphDashboard'

describe('FeatureTelegraphDashboard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // Helper utility to target the custom design system button primitives cleanly
  const unlockTelegraphKey = () => {
    const buttons = screen.getAllByTestId('atom-button') as HTMLElement[]
    const connectButton = buttons.find((btn) => btn.textContent?.includes('Connect Key'))
    if (connectButton) {
      fireEvent.click(connectButton)
    }
  }

  it('initializes signal buffer display with empty placeholder dashboard metrics', () => {
    render(React.createElement(FeatureTelegraphDashboard))

    const statusPlaceholder = screen.getByText('READY FOR TRANSMISSION...') as HTMLElement
    const bufferDisplay = screen.getByText('—') as HTMLElement

    expect(statusPlaceholder).toBeDefined()
    expect(bufferDisplay).toBeDefined()
  })

  it('aggregates multiple tap interactions into an ordered stream layout safely before decoding', async () => {
    render(React.createElement(FeatureTelegraphDashboard))
    unlockTelegraphKey() // 👈 Essential: Wake up the Audio loop channels first!

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement

    // 1. Emit Dot
    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    // 2. Emit Dash
    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(300)
    })
    fireEvent.pointerUp(keyElement)

    // 3. Emit Dot
    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    // Verify the character buffer holds the symbols before the 700ms decode timer ticks
    const updatedBuffer = screen.getByText('. - .') as HTMLElement
    expect(updatedBuffer).toBeDefined()
  })

  it('automatically decodes sequential symbols into words when typing silence elapses', async () => {
    render(React.createElement(FeatureTelegraphDashboard))
    unlockTelegraphKey()

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement

    // Input sequence for 'S' (...)
    for (let i = 0; i < 3; i++) {
      fireEvent.pointerDown(keyElement)
      await act(async () => {
        vi.advanceTimersByTime(50)
      })
      fireEvent.pointerUp(keyElement)
      await act(async () => {
        vi.advanceTimersByTime(50)
      }) // Brief tap interval gap
    }

    // Advance past the 700ms threshold to force character translation
    await act(async () => {
      vi.advanceTimersByTime(750)
    })

    // Confirm symbol buffer cleared and text output stream caught the decoded letter
    expect(screen.getByText('—').textContent).not.toContain('.')
    expect(screen.getByText('S')).toBeDefined()
  })

  it('flushes the message text stream completely upon trigger action', async () => {
    render(React.createElement(FeatureTelegraphDashboard))
    unlockTelegraphKey()

    const keyElement = screen.getByTestId('atom-morse-key') as HTMLElement

    // Emit single Dot to populate text
    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    // Advance to append character and display the clear button
    await act(async () => {
      vi.advanceTimersByTime(750)
    })

    const clearButton = screen.getByText('Clear Message Display') as HTMLElement
    expect(clearButton).toBeDefined()

    // Trigger cleanup reset action
    fireEvent.click(clearButton)

    const resetDisplay = screen.getByText('READY FOR TRANSMISSION...') as HTMLElement
    expect(resetDisplay).toBeDefined()
    expect(screen.queryByText('Clear Message Display')).toBeNull()
  })
})
