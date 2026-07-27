import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomIcon from './AtomIcon.vue'
import meta, { Default, WithNumericSize, WithIconComponent } from './AtomIcon.stories'

type AtomIconProps = InstanceType<typeof AtomIcon>['$props']

const getProps = (storyArgs: typeof Default.args): AtomIconProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomIconProps
}

describe('AtomIcon', () => {
  it('renders text when no icon is provided', () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('Default Icon Text')
    expect(wrapper.find('.atom-icon').attributes('style')).toBeUndefined()
  })

  it('applies custom inline style for pixel values', () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(WithNumericSize.args),
    })

    const targetElement = wrapper.find('[data-testid="atom-icon"]')

    expect(targetElement.attributes('style')).toContain('--icon-size: 42px')
  })

  it('renders injected dynamic functional component structure', () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(WithIconComponent.args),
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').classes()).toContain('w-8')
    expect(wrapper.find('svg').classes()).toContain('h-8')
  })
})
