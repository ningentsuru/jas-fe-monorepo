import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomNavLink from './AtomNavLink.vue'
import meta, { Default, ActiveLink, CustomNumericSize, RouterLinkVariant } from './AtomNavLink.stories'

type AtomNavLinkProps = InstanceType<typeof AtomNavLink>['$props']

const getProps = (storyArgs: typeof Default.args): AtomNavLinkProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomNavLinkProps
}

describe('AtomNavLink', () => {
  it('renders label text contents correctly', () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('Dashboard Overview')
    expect(wrapper.props('label')).toBe('Dashboard Overview')
  })

  it('applies text-primary styling only when marked as active', () => {
    const defaultWrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })
    const activeWrapper = mount(AtomNavLink, {
      props: getProps(ActiveLink.args),
    })

    expect(defaultWrapper.classes()).toContain('text-foreground')
    expect(activeWrapper.classes()).toContain('text-primary')
  })

  it('safely pipes downstream custom numeric sizes to internal button mechanisms', () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(CustomNumericSize.args),
    })

    expect(wrapper.props('size')).toBe(52)
  })

  it('passes routing properties directly down to the core layout layers', () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(RouterLinkVariant.args),
    })

    expect(wrapper.props('to')).toBe('/settings')
  })

  it('renders injected markup content via the named trailing slot structure', () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
      slots: {
        trailing: '<span class="badge-mock">Icon</span>',
      },
    })

    expect(wrapper.find('.badge-mock').exists()).toBe(true)
    expect(wrapper.find('.badge-mock').text()).toBe('Icon')
  })

  it(' bubbles inner click triggers upward seamlessly', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
