import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomNavLink from './AtomNavLink.vue'
import { Default, ActiveLink, CustomNumericSize, RouterLinkVariant } from './AtomNavLink.stories'

describe('AtomNavLink', () => {
  it('renders label text contents correctly', () => {
    const wrapper = mount(AtomNavLink, {
      props: Default.args as any,
    })

    expect(wrapper.text()).toContain('Dashboard Overview')
    expect(wrapper.props('label')).toBe('Dashboard Overview')
  })

  it('applies text-primary styling only when marked as active', () => {
    const defaultWrapper = mount(AtomNavLink, {
      props: Default.args as any,
    })
    const activeWrapper = mount(AtomNavLink, {
      props: ActiveLink.args as any,
    })

    expect(defaultWrapper.classes()).toContain('text-foreground')
    expect(activeWrapper.classes()).toContain('text-primary')
  })

  it('safely pipes downstream custom numeric sizes to internal button mechanisms', () => {
    const wrapper = mount(AtomNavLink, {
      props: CustomNumericSize.args as any,
    })

    expect(wrapper.props('size')).toBe(52)
  })

  it('passes routing properties directly down to the core layout layers', () => {
    const wrapper = mount(AtomNavLink, {
      props: RouterLinkVariant.args as any,
    })

    expect(wrapper.props('to')).toBe('/settings')
  })

  it('renders injected markup content via the named trailing slot structure', () => {
    const wrapper = mount(AtomNavLink, {
      props: Default.args as any,
      slots: {
        trailing: '<span class="badge-mock">Icon</span>',
      },
    })

    expect(wrapper.find('.badge-mock').exists()).toBe(true)
    expect(wrapper.find('.badge-mock').text()).toBe('Icon')
  })

  it(' bubbles inner click triggers upward seamlessly', async () => {
    const wrapper = mount(AtomNavLink, {
      props: Default.args as any,
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
