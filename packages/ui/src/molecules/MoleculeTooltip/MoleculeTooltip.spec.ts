import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { MoleculeTooltip } from './MoleculeTooltip'
import meta, { Default, PositionBottom, FastDelay } from './MoleculeTooltip.stories'

type MoleculeTooltipProps = InstanceType<typeof MoleculeTooltip>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeTooltipProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeTooltipProps
}

describe('MoleculeTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 120 })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 40 })
    HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 80,
      height: 24,
      top: 100,
      left: 100,
      bottom: 124,
      right: 180,
    } as DOMRect))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders root hover container elements cleanly with default configurations', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="molecule-tooltip"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tax Information Override')
  })

  it('mounts hidden elements securely and mounts panels when hovering trigger targets', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('.data-visible').exists()).toBe(false)

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.data-visible').exists()).toBe(true)
  })

  it('triggers visibility exit timeout loops gracefully when unhovering', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(FastDelay.args),
    })

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.data-visible').exists()).toBe(true)

    await trigger.trigger('mouseleave')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.data-visible').exists()).toBe(true)

    await vi.advanceTimersByTimeAsync(50)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.data-visible').exists()).toBe(false)
  })

  it('accepts orientation positions parameters precisely matching interface properties', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(PositionBottom.args),
    })

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    const panel = wrapper.find('.data-visible')
    expect(panel.exists()).toBe(true)
  })
})
