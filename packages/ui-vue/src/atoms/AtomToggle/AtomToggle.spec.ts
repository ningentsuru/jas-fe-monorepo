import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomToggle from './AtomToggle'
import { globalLongPressHandlers } from '../../setup'
import meta, { Default, ToggledActive, CustomNumericSize } from './AtomToggle.stories'

type AtomToggleProps = InstanceType<typeof AtomToggle>['$props']

const getProps = (storyArgs: typeof Default.args): AtomToggleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomToggleProps
}

describe('AtomToggle', () => {
  it('renders matching text parameters and sub-elements accurately', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="atom-toggle"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('atom-toggle')
  })

  it('receives and pipes configuration inputs cleanly down the render path', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps(CustomNumericSize.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('size')).toBe(48)
    expect(wrapper.props('isToggled')).toBe(false)
  })

  it('verifies focus utility class configuration attributes are bound properly', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    expect(button.classes()).toContain('focus-visible:ring-ring')
    expect(button.classes()).toContain('focus-visible:ring-2')
    expect(button.classes()).toContain('focus-visible:outline-none')
  })

  it('receives and binds the active state toggled property correctly', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps(ToggledActive.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('isToggled')).toBe(true)
  })

  it('triggers custom structural click events correctly via long-press mock directives', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    if (globalLongPressHandlers.onToggle) {
      globalLongPressHandlers.onToggle()
    }
    expect(wrapper.emitted('toggle')).toBeTruthy()

    if (globalLongPressHandlers.onLongToggle) {
      globalLongPressHandlers.onLongToggle()
    }
    expect(wrapper.emitted('longToggle')).toBeTruthy()
  })
})
