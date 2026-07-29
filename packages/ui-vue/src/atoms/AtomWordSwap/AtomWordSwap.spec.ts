import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomWordSwap from './AtomWordSwap.vue'
import meta, { Default, FastFlipTransition, SingleWordFallback } from './AtomWordSwap.stories'

type AtomWordSwapProps = InstanceType<typeof AtomWordSwap>['$props']

const getProps = (storyArgs: typeof Default.args): AtomWordSwapProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomWordSwapProps
}

describe('AtomWordSwap', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the initial word configuration parameter accurately on mount', async () => {
    const wrapper = mount(AtomWordSwap, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Innovative')
  })

  it('receives correct structural configurations from Storybook properties', async () => {
    const wrapper = mount(AtomWordSwap, {
      props: getProps(FastFlipTransition.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('transition')).toBe('flip')
    expect(wrapper.props('interval')).toBe(1000)
    expect(wrapper.props('words')).toContain('Innovative')
  })

  it('advances indices and swaps displayed words dynamically when timer intervals elapse', async () => {
    const wrapper = mount(AtomWordSwap, {
      props: getProps(FastFlipTransition.args),
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Innovative')

    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Performant')

    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Accessible')

    await vi.advanceTimersByTimeAsync(2000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Innovative')
  })

  it('prevents swapping executions completely if the array contains only one item', async () => {
    const wrapper = mount(AtomWordSwap, {
      props: getProps(SingleWordFallback.args),
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Static')

    await vi.advanceTimersByTimeAsync(5000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Static')
  })

  it('calculates the dynamic maxWidth styling string correctly to fit the longest string', async () => {
    const wrapper = mount(AtomWordSwap, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()
    const element = wrapper.element as HTMLElement

    expect(element.style.minWidth).toBe('10.5ch')
  })
})
