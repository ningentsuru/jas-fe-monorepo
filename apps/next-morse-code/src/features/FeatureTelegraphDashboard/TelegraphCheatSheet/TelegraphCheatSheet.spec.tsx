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
      name: /View Morse Code Cheat Sheet Reference Matrix/i,
    })
    expect(triggerButton).toBeInTheDocument()
  })

  it('should sort the morse dictionary records alphabetically prior to printing the rows', () => {
    render(<TelegraphCheatSheet morseDictionary={mockDictionary} />)

    const renderedContent = screen.getByTestId('mock-tooltip-content')

    const charElements = renderedContent.querySelectorAll('span')

    const renderedOrder = Array.from(charElements)
      .map((el) => el.textContent?.trim() || '')
      .filter((text) => ['A:', 'B:', 'C:'].includes(text))
      .map((text) => text.replace(':', ''))

    expect(renderedOrder).toEqual(['A', 'B', 'C'])
    expect(screen.getByText('.-')).toBeInTheDocument()
  })
})
