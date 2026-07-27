import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomIcon from './AtomIcon.vue'
import { Default, WithNumericSize, WithIconComponent } from './AtomIcon.stories'

type AtomIconProps = InstanceType<typeof AtomIcon>['$props']

describe('AtomIcon', () => {
  it('renders text when no icon is provided', () => {
    const wrapper = mount(AtomIcon, {
      props: Default.args as AtomIconProps,
    })

    expect(wrapper.text()).toContain('Default Icon Text')
    expect(wrapper.find('.atom-icon').attributes('style')).toBeUndefined()
  })

  it('applies custom inline style for pixel values', () => {
    const wrapper = mount(AtomIcon, {
      props: WithNumericSize.args as AtomIconProps,
    })

    const targetElement = wrapper.find('[data-testid="atom-icon"]')

    expect(targetElement.attributes('style')).toContain('--icon-size: 42px')
  })

  it('renders injected dynamic functional component structure', () => {
    const wrapper = mount(AtomIcon, {
      props: WithIconComponent.args as AtomIconProps,
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').classes()).toContain('w-8')
    expect(wrapper.find('svg').classes()).toContain('h-8')
  })
})
