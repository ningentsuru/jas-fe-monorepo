import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MoleculeCarousel, { type MoleculeCarouselProps } from './MoleculeCarousel'
import meta, { Default, SingleSlideState } from './MoleculeCarousel.stories'

vi.mock('../../', () => ({
  AtomButton: ({ children, onClick, 'data-testid': testId }: any) =>
    React.createElement('button', { type: 'button', onClick, 'data-testid': testId }, children),
  AtomIcon: ({ icon: Icon, size }: any) =>
    React.createElement('span', { 'data-testid': 'mock-icon', 'data-size': size }, 'icon')
}))

const getProps = (storyArgs?: Partial<MoleculeCarouselProps>): MoleculeCarouselProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeCarouselProps
}

describe('MoleculeCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders root semantic structure layout context elements correctly', () => {
    render(React.createElement(MoleculeCarousel, getProps(Default.args)))

    const root = screen.getByTestId('molecule-carousel')
    const track = screen.getByTestId('carousel-track')

    expect(root).toBeDefined()
    expect(track).toBeDefined()
    expect(document.body.contains(root)).toBe(true)
    expect(screen.getByText('molecule-carousel')).toBeDefined()
  })

  it('advances indices and shifts track styles linearly when clicking next action controls', () => {
    render(React.createElement(MoleculeCarousel, getProps(Default.args)))

    const nextBtn = screen.getByTestId('next-btn')
    const track = screen.getByTestId('carousel-track')

    expect(track.style.transform).toBe('translateX(-0%)')

    fireEvent.click(nextBtn)
    expect(track.style.transform).toBe('translateX(-100%)')
  })

  it('automatically rolls slide items forward when autoPlay timers trigger', async () => {
    render(React.createElement(MoleculeCarousel, getProps({
      ...Default.args,
      autoPlay: true,
      interval: 2000,
    })))

    const track = screen.getByTestId('carousel-track')
    expect(track.style.transform).toBe('translateX(-0%)')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })
    expect(track.style.transform).toBe('translateX(-100%)')
  })

  it('hides transition navigation triggers and indicator blocks if track item counts equal 1', () => {
    render(React.createElement(MoleculeCarousel, getProps(SingleSlideState.args)))

    expect(screen.queryByTestId('prev-btn')).toBeNull()
    expect(screen.queryByTestId('next-btn')).toBeNull()
    expect(screen.queryByTestId('carousel-indicators')).toBeNull()
  })
})
