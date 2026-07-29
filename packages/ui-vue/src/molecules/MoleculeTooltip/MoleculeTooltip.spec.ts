import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeTooltip from './MoleculeTooltip.vue'
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
      observe() { }
      unobserve() { }
      disconnect() { }
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
      global: {
        stubs: {
          transition: true, // Short-circuit animation hooks to instantly render layout state changes
        },
      },
    })

    // The inner container wrapper is securely hidden initially
    expect(wrapper.find('.bg-card').exists()).toBe(false)

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')

    // Advance timers and flush microtask cycles to handle show() nextTick positioning tasks
    await vi.runOnlyPendingTimersAsync()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.bg-card').exists()).toBe(true)
  })

  it('triggers visibility exit timeout loops gracefully when unhovering', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(FastDelay.args),
      global: {
        stubs: {
          transition: true,
        },
      },
    })

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')
    await vi.runOnlyPendingTimersAsync()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.bg-card').exists()).toBe(true)

    await trigger.trigger('mouseleave')
    await wrapper.vm.$nextTick()

    // Tooltip remains visible during the custom delay loop cycle
    expect(wrapper.find('.bg-card').exists()).toBe(true)

    // Advance vitest clocks past your custom fast action boundary threshold (50ms)
    await vi.advanceTimersByTimeAsync(50)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.bg-card').exists()).toBe(false)
  })

  it('accepts orientation positions parameters precisely matching interface properties', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(PositionBottom.args),
      global: {
        stubs: {
          transition: true,
        },
      },
    })

    const trigger = wrapper.find('[data-testid="molecule-tooltip"]')
    await trigger.trigger('mouseenter')
    await vi.runOnlyPendingTimersAsync()
    await wrapper.vm.$nextTick()

    const panel = wrapper.find('.bg-card')
    expect(panel.exists()).toBe(true)
  })
})
