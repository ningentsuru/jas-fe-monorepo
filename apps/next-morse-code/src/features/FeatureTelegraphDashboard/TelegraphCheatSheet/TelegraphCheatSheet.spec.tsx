import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TelegraphCheatSheet } from './TelegraphCheatSheet'

vi.mock('@repo/ui-react', () => {
  return {
    MoleculeTooltip: ({
      children,
      content,
    }: {
      children: React.ReactNode
      content: React.ReactNode
    }) => (
      <div data-testid="mock-tooltip-wrapper">
        {children}
        <div data-testid="mock-tooltip-content">{content}</div>
      </div>
    ),
  }
})

describe('TelegraphCheatSheet Spec', () => {
  const mockDictionary = {
    '-...': 'B',
    '.-': 'A',
    '-.-.': 'C',
  }

  it('should render the trigger button with the default descriptive help label', () => {
    render(<TelegraphCheatSheet morseDictionary={mockDictionary} />)

    const triggerButton = screen.getByRole('button', {
      name: /Hover to view Morse Code Cheat Sheet/i,
    })
    expect(triggerButton).toBeInTheDocument()
  })

  it('should sort the morse dictionary records alphabetically prior to printing the rows', () => {
    render(<TelegraphCheatSheet morseDictionary={mockDictionary} />)

    const charElements = screen.getAllByText(/:$/)
    const renderedOrder = charElements.map((el) => el.textContent?.replace(':', ''))

    expect(renderedOrder).toEqual(['A', 'B', 'C'])
    expect(screen.getByText('.-')).toBeInTheDocument()
  })
})
