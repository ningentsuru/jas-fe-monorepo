import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismHero from './OrganismHero.vue'
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
      global: { stubs: { AtomButton: true } },
    })

    expect(wrapper.find('[data-testid="organism-hero"]').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('The Next Generation Monorepo Framework')
    expect(wrapper.find('p').text()).toContain('Build fluid, micro-frontend experiences')
    expect(wrapper.find('.sr-only').text()).toBe('organism-hero')
  })

  it('mutates container styling layouts dynamically depending on the alignment parameter', () => {
    const defaultWrapper = mount(OrganismHero, {
      props: getProps(Default.args),
      global: { stubs: { AtomButton: true } },
    })
    const leftWrapper = mount(OrganismHero, {
      props: getProps(LeftAligned.args),
      global: { stubs: { AtomButton: true } },
    })

    expect(defaultWrapper.classes()).toContain('text-center')
    expect(defaultWrapper.classes()).toContain('justify-center')

    expect(leftWrapper.classes()).toContain('text-left')
    expect(leftWrapper.classes()).toContain('justify-start')
  })

  it('renders the blur overlay layer when an image background is provided', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(WithImageBackground.args),
      global: { stubs: { AtomButton: true } },
    })

    expect(wrapper.find('video').exists()).toBe(false)
    expect(wrapper.find('.backdrop-blur-\\[2px\\]').exists()).toBe(true)
  })

  it('mounts the background video layer and passes the poster attributes securely', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps(WithVideoBackground.args),
      global: { stubs: { AtomButton: true } },
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
      global: {
        stubs: {
          AtomButton: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    const buttons = wrapper.findAllComponents({ name: 'AtomButton' })
    expect(buttons.length).toBe(2)

    expect(buttons.at(0)?.text()).toBe('Explore Core Atoms')
    expect(buttons.at(1)?.text()).toBe('View GitHub Source')
  })

  it('omits button structures completely from the layout tree if parameters are empty', () => {
    const wrapper = mount(OrganismHero, {
      props: getProps({
        ...Default.args,
        ctaLabel: '',
        secondaryLabel: '',
      }),
      global: { stubs: { AtomButton: true } },
    })

    expect(wrapper.findComponent({ name: 'AtomButton' }).exists()).toBe(false)
  })
})
