import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeCarousel from './MoleculeCarousel.vue'
import meta, { Default, RestrictedNoLoop, SingleSlideState } from './MoleculeCarousel.stories'

type MoleculeCarouselProps = InstanceType<typeof MoleculeCarousel>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeCarouselProps => {
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
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    expect(wrapper.find('[data-testid="molecule-carousel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="carousel-track"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('molecule-carousel')
  })

  it('receives and maps slides structural arrays payload properties downwards accurately', () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    expect(wrapper.props('items')).toBeDefined()
    expect(wrapper.props('items').length).toBe(3)
    expect(wrapper.find('h3').text()).toBe('Feature-Sliced Design Integration')
  })

  it('advances indices and shifts track styles linearly when clicking next action controls', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: {
        stubs: {
          AtomButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
          AtomIcon: true,
        },
      },
    })

    const nextBtn = wrapper.find('[data-testid="next-btn"]')
    const track = wrapper.find('[data-testid="carousel-track"]')

    expect(track.attributes('style')).toContain('transform: translateX(-0%);')

    await nextBtn.trigger('click')
    expect(track.attributes('style')).toContain('transform: translateX(-100%);')
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  it('loops index vectors back around safely to origin configurations when boundary lines are crossed', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: {
        stubs: {
          AtomButton: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
          AtomIcon: true,
        },
      },
    })

    const prevBtn = wrapper.find('[data-testid="prev-btn"]')
    const track = wrapper.find('[data-testid="carousel-track"]')

    // At index 0, clicking prev loops seamlessly to the last slide (index 2)
    await prevBtn.trigger('click')
    expect(track.attributes('style')).toContain('transform: translateX(-200%);')
  })

  it('hides transition navigation triggers and indicator blocks if track item counts equal 1', () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(SingleSlideState.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    expect(wrapper.find('[data-testid="prev-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="next-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="carousel-indicators"]').exists()).toBe(false)
  })

  it('hides the previous arrow explicitly on structural boundaries if loop constraints equal false', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(RestrictedNoLoop.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    // At initial index 0, loop=false hides the previous control arrow trigger
    expect(wrapper.find('[data-testid="prev-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="next-btn"]').exists()).toBe(true)
  })

  it('automatically rolls slide items forward when autoPlay timers trigger', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps({
        ...Default.args,
        autoPlay: true,
        interval: 2000,
      }),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    const track = wrapper.find('[data-testid="carousel-track"]')
    expect(track.attributes('style')).toContain('transform: translateX(-0%);')

    // Advance mock clock to execute the autoPlay tracking intervals loop pass
    await vi.advanceTimersByTimeAsync(2000)
    expect(track.attributes('style')).toContain('transform: translateX(-100%);')
    await vi.advanceTimersByTimeAsync(2000)
    expect(track.attributes('style')).toContain('transform: translateX(-200%);')
  })

  it('intercepts native keyboard vector commands to shift slide index positions securely', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    const rootEl = wrapper.find('[data-testid="molecule-carousel"]')
    const track = wrapper.find('[data-testid="carousel-track"]')

    expect(track.attributes('style')).toContain('transform: translateX(-0%);')

    // Fire hardware right arrow keyboard controls natively onto the component container focus tree
    await rootEl.trigger('keydown', { key: 'ArrowRight' })
    expect(track.attributes('style')).toContain('transform: translateX(-100%);')
  })
})
