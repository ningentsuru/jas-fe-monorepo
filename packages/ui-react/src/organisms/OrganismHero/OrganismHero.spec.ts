import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrganismHero, { type OrganismHeroProps } from './OrganismHero'
import meta, {
  Default,
  LeftAligned,
  WithImageBackground,
  WithVideoBackground,
} from './OrganismHero.stories'

vi.mock('../../', () => ({
  AtomButton: ({ children, to, href, target, variant, size }: any) =>
    React.createElement(
      'button',
      {
        type: 'button',
        'data-testid': 'mock-button',
        'data-to': to,
        'data-href': href,
        'data-target': target,
        'data-variant': variant,
        'data-size': size,
      },
      children,
    ),
}))

const getProps = (storyArgs?: Partial<OrganismHeroProps>): OrganismHeroProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismHeroProps
}

describe('OrganismHero', () => {
  it('renders title headings and paragraph body content accurately', () => {
    render(React.createElement(OrganismHero, getProps(Default.args)))

    const hero = screen.getByTestId('organism-hero')
    const title = screen.getByTestId('hero-title')
    const subtitle = screen.getByTestId('hero-subtitle')

    expect(hero).toBeDefined()
    expect(title.textContent).toBe('The Next Generation Monorepo Framework')
    expect(subtitle.textContent).toContain('Build fluid, micro-frontend experiences')
    expect(screen.getByText('organism-hero')).toBeDefined()
  })

  it('mutates container styling layouts dynamically depending on the alignment parameter', () => {
    const { rerender } = render(React.createElement(OrganismHero, getProps(Default.args)))
    const defaultHero = screen.getByTestId('organism-hero')
    expect(defaultHero.classList.contains('text-center')).toBe(true)
    expect(defaultHero.classList.contains('justify-center')).toBe(true)

    rerender(React.createElement(OrganismHero, getProps(LeftAligned.args)))
    const leftHero = screen.getByTestId('organism-hero')
    expect(leftHero.classList.contains('text-left')).toBe(true)
    expect(leftHero.classList.contains('justify-start')).toBe(true)
  })

  it('renders the blur overlay layer when an image background is provided', () => {
    render(React.createElement(OrganismHero, getProps(WithImageBackground.args)))

    expect(screen.queryByTestId('hero-video')).toBeNull()
    const overlay = screen.getByTestId('hero-overlay')
    expect(overlay).toBeDefined()
    expect(overlay.classList.contains('backdrop-blur-[2px]')).toBe(true)
  })

  it('mounts the background video layer and passes the poster attributes securely', () => {
    render(React.createElement(OrganismHero, getProps(WithVideoBackground.args)))

    const videoEl = screen.getByTestId('hero-video') as HTMLVideoElement
    const sourceEl = screen.getByTestId('hero-video-source') as HTMLSourceElement
    const overlay = screen.getByTestId('hero-overlay')

    expect(videoEl).toBeDefined()
    expect(videoEl.getAttribute('poster')).toBe('https://unsplash.com')
    expect(sourceEl.getAttribute('src')).toBe('https://mixkit.co')
    expect(overlay).toBeDefined()
  })

  it('pipes anchor properties, targets, and labels straight to nested action button elements', () => {
    render(React.createElement(OrganismHero, getProps(Default.args)))

    const buttons = screen.getAllByTestId('mock-button')
    expect(buttons.length).toBe(2)

    expect(buttons[0].textContent).toBe('Explore Core Atoms')
    expect(buttons[0].getAttribute('data-href')).toBe('#explore')
    expect(buttons[0].getAttribute('data-target')).toBe('_self')
    expect(buttons[0].getAttribute('data-variant')).toBe('primary')

    expect(buttons[1].textContent).toBe('View GitHub Source')
    expect(buttons[1].getAttribute('data-href')).toBe('https://github.com')
    expect(buttons[1].getAttribute('data-target')).toBe('_blank')
    expect(buttons[1].getAttribute('data-variant')).toBe('secondary')
  })

  it('omits button structures completely from the layout tree if parameters are empty', () => {
    render(
      React.createElement(
        OrganismHero,
        getProps({
          ...Default.args,
          ctaLabel: '',
          secondaryLabel: '',
        }),
      ),
    )

    expect(screen.queryByTestId('mock-button')).toBeNull()
    const heroText = screen.getByTestId('organism-hero').textContent
    expect(heroText).not.toContain('Explore Core Atoms')
    expect(heroText).not.toContain('View GitHub Source')
  })
})
