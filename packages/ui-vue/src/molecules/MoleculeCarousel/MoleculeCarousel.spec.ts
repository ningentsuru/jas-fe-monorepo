import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeCarousel from './MoleculeCarousel.vue'
import meta, { Default, SingleSlideState } from './MoleculeCarousel.stories'

type MoleculeCarouselProps = InstanceType<typeof MoleculeCarousel>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeCarouselProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as MoleculeCarouselProps
}

describe('MoleculeCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders root semantic structure layout context elements correctly', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
      global: { stubs: { AtomButton: true, AtomIcon: true } },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="molecule-carousel"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="carousel-track"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('molecule-carousel')
  })

  it('advances indices and shifts track styles linearly when clicking next action controls', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const nextBtn = wrapper.find('[data-testid="next-btn"]')
    const track = wrapper.find('[data-testid="carousel-track"]')

    expect(track.attributes('style')).toContain('transform: translateX(-0%);')

    await nextBtn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(track.attributes('style')).toContain('transform: translateX(-100%);')
  })

  it('automatically rolls slide items forward when autoPlay timers trigger', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps({
        ...Default.args,
        autoPlay: true,
        interval: 2000,
      }),
    })

    await wrapper.vm.$nextTick()
    const track = wrapper.find('[data-testid="carousel-track"]')
    expect(track.attributes('style')).toContain('transform: translateX(-0%);')

    await vi.advanceTimersByTimeAsync(2000)
    await wrapper.vm.$nextTick()
    expect(track.attributes('style')).toContain('transform: translateX(-100%);')
  })

  it('hides transition navigation triggers and indicator blocks if track item counts equal 1', async () => {
    const wrapper = mount(MoleculeCarousel, {
      props: getProps(SingleSlideState.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="prev-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="next-btn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="carousel-indicators"]').exists()).toBe(false)
  })
})
