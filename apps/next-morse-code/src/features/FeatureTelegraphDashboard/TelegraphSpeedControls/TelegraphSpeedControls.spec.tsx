import React, { ComponentProps } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TelegraphSpeedControls } from './TelegraphSpeedControls'
import { Default } from './TelegraphSpeedControls.stories'
import { DIFFICULTY_PRESETS } from '@/types/telegraph'

vi.mock('@repo/ui-react', () => {
  return {
    AtomButton: ({ children, onClick, className }: React.ComponentPropsWithoutRef<'button'>) => (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    ),
    MoleculeTooltip: ({
      children,
      content,
    }: {
      children: React.ReactNode
      content: React.ReactNode
    }) => (
      <div data-testid="speed-tooltip-wrapper">
        {children}
        <div data-testid="speed-tooltip-content">{content}</div>
      </div>
    ),
  }
})

describe('TelegraphSpeedControls Component Spec', () => {
  let mockOnTimingChange = vi.fn()
  let mockOnApplyPreset = vi.fn()

  const defaultTimings = {
    signalDelay: 100,
    letterBreakDelay: 400,
    wordBreakDelay: 1400,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockOnTimingChange = vi.fn()
    mockOnApplyPreset = vi.fn()
  })

  it('renders properly using Storybook args parameters', () => {
    const testProps = Default.args as ComponentProps<typeof TelegraphSpeedControls>

    render(<TelegraphSpeedControls {...testProps} />)

    const triggerBtn = screen.getByRole('button', { name: /Adjust Key & Timing Speeds/i })
    expect(triggerBtn).toBeInTheDocument()

    expect(screen.getByText('Signal Tap Delay:')).toBeInTheDocument()
    expect(screen.getByText('Next Action (Letter Break):')).toBeInTheDocument()
  })

  it('should list out all three timing speed descriptions and current millisecond states', () => {
    render(
      <TelegraphSpeedControls
        timings={defaultTimings}
        onTimingChange={mockOnTimingChange}
        onApplyPreset={mockOnApplyPreset}
      />,
    )

    expect(screen.getByText('Signal Tap Delay:')).toBeInTheDocument()
    expect(screen.getByText('100ms')).toBeInTheDocument()
    expect(screen.getByText('Next Action (Letter Break):')).toBeInTheDocument()
    expect(screen.getByText('400ms')).toBeInTheDocument()
  })

  it('should trigger the cascading calculation handlers when a range slider is adjusted', () => {
    render(
      <TelegraphSpeedControls
        timings={defaultTimings}
        onTimingChange={mockOnTimingChange}
        onApplyPreset={mockOnApplyPreset}
      />,
    )

    const wordBreakInput = screen.getByDisplayValue('1400')
    fireEvent.change(wordBreakInput, { target: { value: '500' } })

    expect(mockOnTimingChange).toHaveBeenCalledWith('wordBreakDelay', 500)
  })

  it('should fire the correct state applicator when an operator triggers a transmission rank button', () => {
    render(
      <TelegraphSpeedControls
        timings={defaultTimings}
        onTimingChange={mockOnTimingChange}
        onApplyPreset={mockOnApplyPreset}
      />,
    )

    const expertButton = screen.getByRole('button', { name: /expert/i })
    expect(expertButton).toBeInTheDocument()

    fireEvent.click(expertButton)

    expect(mockOnApplyPreset).toHaveBeenCalledWith(DIFFICULTY_PRESETS.expert)
  })
})
