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

    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))

    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 40,
      top: 500,
      left: 500,
      bottom: 540,
      right: 600,
      x: 500,
      y: 500,
      toJSON: () => {},
    })

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 80 })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders root trigger layout architecture properly using fallback slot text values', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="molecule-tooltip"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tax Information Override')
  })

  it('verifies configuration properties match mapped design tokens correctly', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(FastDelay.args),
    })

    expect(wrapper.props('delay')).toBe(50)
    expect(wrapper.props('position')).toBe('top')
  })

  it('keeps tooltip content hidden prior to hover action triggers', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('div.absolute').exists()).toBe(false)
  })

  it('mounts the popup card container when pointer enter actions fire on the trigger', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
    })

    const triggerContainer = wrapper.find('[data-testid="molecule-tooltip"]')
    await triggerContainer.trigger('mouseenter')
    await wrapper.vm.$nextTick()

    const popupCard = wrapper.find('div.absolute')
    expect(popupCard.exists()).toBe(true)
    expect(popupCard.text()).toContain('Tax Information Override')
  })

  it('unmounts the tooltip layout completely after the hover delay window expires', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(FastDelay.args), 
    })

    const triggerContainer = wrapper.find('[data-testid="molecule-tooltip"]')

    await triggerContainer.trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div.absolute').exists()).toBe(true)

    await triggerContainer.trigger('mouseleave')
    expect(wrapper.find('div.absolute').exists()).toBe(true) 

    await vi.advanceTimersByTimeAsync(50)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('div.absolute').exists()).toBe(false)
  })

  it('renders custom rich text layouts safely within the contents slot name injection layer', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(Default.args),
      slots: {
        content: '<span class="rich-mock">Injected Paragraph Data</span>',
      },
    })

    await wrapper.find('[data-testid="molecule-tooltip"]').trigger('mouseenter')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.rich-mock').text()).toBe('Injected Paragraph Data')
  })

  it('calculates position calculations accurately for bottom orientation targets', async () => {
    const wrapper = mount(MoleculeTooltip, {
      props: getProps(PositionBottom.args),
    })

    await wrapper.find('[data-testid="molecule-tooltip"]').trigger('mouseenter')
    await wrapper.vm.$nextTick()

    const popupCard = wrapper.find('div.absolute')
    const element = popupCard.element as HTMLElement

    expect(element.style.top).toBe('548px')
  })
})
