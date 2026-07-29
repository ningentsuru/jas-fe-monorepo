import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Smile } from '@lucide/vue'
import AtomIcon from './AtomIcon'
import meta, { Default, TextFallbackState, CustomNumericSize } from './AtomIcon.stories'

type AtomIconProps = InstanceType<typeof AtomIcon>['$props']

const getProps = (storyArgs: typeof Default.args): AtomIconProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomIconProps
}

describe('AtomIcon', () => {
  it('renders a custom dynamic icon component correctly when passed down', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="atom-icon"]').exists()).toBe(true)
    expect(wrapper.findComponent(Smile).exists()).toBe(true)
  })

  it('falls back seamlessly to rendering text spans if component object is missing', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(TextFallbackState.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Fallback Text')
    expect(wrapper.findComponent(Smile).exists()).toBe(false)
  })

  it('safely pipes pixel sizing attributes as custom inline CSS variables when numbers match', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps(CustomNumericSize.args),
    })

    await wrapper.vm.$nextTick()

    const domElement = wrapper.element as HTMLElement
    expect(domElement.style.getPropertyValue('--icon-size')).toBe('48px')
  })
})
