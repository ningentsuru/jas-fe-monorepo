import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import FeatureTelegraphDashboard from './FeatureTelegraphDashboard'

vi.mock('@repo/ui-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@repo/ui-react')>()
  return {
    ...actual,
    audioMorsePlayer: {
      startDummySilence: vi.fn(),
      stopDummySilence: vi.fn(),
      startSignal: vi.fn(),
      stopSignal: vi.fn(),
    },
  }
})

describe('FeatureTelegraphDashboard Integration Spec', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const unlockTelegraphKey = (keyElement: HTMLElement) => {
    fireEvent.pointerDown(keyElement)
    fireEvent.pointerUp(keyElement)
  }

  it('initializes signal buffer display with empty placeholder dashboard metrics', () => {
    render(<FeatureTelegraphDashboard />)

    const statusPlaceholder = screen.getByText('READY FOR TRANSMISSION...')
    const bufferDisplay = screen.getByText('_')

    expect(statusPlaceholder).toBeInTheDocument()
    expect(bufferDisplay).toBeInTheDocument()
  })

  it('aggregates multiple tap interactions into an ordered stream layout safely before decoding', async () => {
    render(<FeatureTelegraphDashboard />)

    const keyElement = screen.getByTestId('atom-morse-key')
    unlockTelegraphKey(keyElement)

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(300)
    })
    fireEvent.pointerUp(keyElement)

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    const updatedBuffer = screen.getByText('. - .')
    expect(updatedBuffer).toBeInTheDocument()
  })

  it('automatically decodes sequential symbols into words when typing silence elapses', async () => {
    render(<FeatureTelegraphDashboard />)
    const keyElement = screen.getByTestId('atom-morse-key')
    unlockTelegraphKey(keyElement)

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    await act(async () => {
      vi.advanceTimersByTime(450)
    })

    expect(screen.getByText('_')).toBeInTheDocument()
    expect(screen.getByText('E')).toBeInTheDocument()
  })

  it('flushes the message text stream completely upon trigger action', async () => {
    render(<FeatureTelegraphDashboard />)
    const keyElement = screen.getByTestId('atom-morse-key')
    unlockTelegraphKey(keyElement)

    fireEvent.pointerDown(keyElement)
    await act(async () => {
      vi.advanceTimersByTime(50)
    })
    fireEvent.pointerUp(keyElement)

    await act(async () => {
      vi.advanceTimersByTime(450)
    })

    const clearButton = screen.getByRole('button', { name: /Clear Message Display/i })
    expect(clearButton).toBeInTheDocument()
    expect(clearButton).not.toBeDisabled()

    fireEvent.click(clearButton)

    const resetDisplay = screen.getByText('READY FOR TRANSMISSION...')
    expect(resetDisplay).toBeInTheDocument()
    expect(clearButton).toBeDisabled()
  })
})
