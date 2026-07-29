import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrganismHero } from './OrganismHero'
import meta, {
  Default,
  LeftAligned,
  WithImageBackground,
  WithVideoBackground,
} from './OrganismHero.stories'

type OrganismHeroProps = InstanceType<typeof OrganismHero>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismHeroProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismHeroProps
}

describe('OrganismHero', () => {
  it('renders title headings and paragraph body content accurately', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="organism-hero"]').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('The Next Generation Monorepo Framework')
    expect(wrapper.find('p').text()).toContain('Build fluid, micro-frontend experiences')
    expect(wrapper.find('.sr-only').text()).toBe('organism-hero')
  })

  it('mutates container styling layouts dynamically depending on the alignment parameter', () => {
    const defaultWrapper = mount(OrganismHero, {
      props: getProps(Default.args),
    })
    const leftWrapper = mount(OrganismHero, {
      props: getProps(LeftAligned.args),
    })

    expect(defaultWrapper.classes()).toContain('text-center')
    expect(defaultWrapper.classes()).toContain('justify-center')

    expect(leftWrapper.classes()).toContain('text-left')
    expect(leftWrapper.classes()).toContain('justify-start')
  })

  it('renders the blur overlay layer when an image background is provided', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(WithImageBackground.args),
    })

    expect(wrapper.find('video').exists()).toBe(false)
    expect(wrapper.find('.backdrop-blur-\\[2px\\]').exists()).toBe(true)
  })

  it('mounts the background video layer and passes the poster attributes securely', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(WithVideoBackground.args),
    })

    const videoEl = wrapper.find('video')
    expect(videoEl.exists()).toBe(true)
    expect(videoEl.attributes('poster')).toBe('https://unsplash.com')
    expect(videoEl.find('source').attributes('src')).toBe('https://mixkit.co')
    expect(wrapper.find('.backdrop-blur-\\[2px\\]').exists()).toBe(true)
  })

  it('pipes anchor properties, targets, and labels straight to nested action button elements', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(Default.args),
    })

    const buttonTexts = wrapper.findAll('span').filter(el => {
      return el.text() === 'Explore Core Atoms' || el.text() === 'View GitHub Source'
    })

    expect(buttonTexts.length).toBe(2)
    expect(buttonTexts.at(0)?.text()).toBe('Explore Core Atoms')
    expect(buttonTexts.at(1)?.text()).toBe('View GitHub Source')
  })

  it('omits button structures completely from the layout tree if parameters are empty', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps({
        ...Default.args,
        ctaLabel: '',
        secondaryLabel: '',
      }),
    })

    const hasText1 = wrapper.text().includes('Explore Core Atoms')
    const hasText2 = wrapper.text().includes('View GitHub Source')

    expect(hasText1).toBe(false)
    expect(hasText2).toBe(false)
  })
})
