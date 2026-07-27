import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismHeader from './OrganismHeader.vue'
import meta, { Default, EmptyNavigationShell } from './OrganismHeader.stories'

type OrganismHeaderProps = InstanceType<typeof OrganismHeader>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismHeaderProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismHeaderProps
}

describe('OrganismHeader', () => {
  it('renders root semantic structure layout context elements correctly', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps(Default.args),
      global: {
        stubs: {
          OrganismNavigation: true,
        },
      },
    })

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('header').classes()).toContain('sticky')
    expect(wrapper.find('header').classes()).toContain('bg-card')
  })

  it('pipes navigational array payload items data properties downwards securely', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps(Default.args),
      global: { stubs: { OrganismNavigation: true } },
    })

    expect(wrapper.props('navItems')).toBeDefined()
    expect(wrapper.props('navItems')?.length).toBe(3)
    expect(wrapper.props('navItems')?.[0].label).toBe('Dashboard')
  })

  it('supplies fallback array structures safely when props contain empty elements', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps(EmptyNavigationShell.args),
      global: { stubs: { OrganismNavigation: true } },
    })

    expect(wrapper.props('navItems')).toEqual([])
  })

  it('renders branding template slots context details within the header layout accurately', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps(Default.args),
      global: { stubs: { OrganismNavigation: true } },
      slots: {
        branding: '<span class="logo-mock">Core Brand Logo</span>',
      },
    })

    const brandingEl = wrapper.find('.logo-mock')
    expect(brandingEl.exists()).toBe(true)
    expect(brandingEl.text()).toBe('Core Brand Logo')
  })

  it('mounts auxiliary items through the named theme-toggle component configuration slots', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps(Default.args),
      global: { stubs: { OrganismNavigation: true } },
      slots: {
        'theme-toggle': '<div class="toggle-mock">Theme Action Button</div>',
      },
    })

    const toggleWrapper = wrapper.find('.border-l')
    expect(toggleWrapper.exists()).toBe(true)
    expect(toggleWrapper.find('.toggle-mock').text()).toBe('Theme Action Button')
  })
})
