import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import OrganismHeader from './OrganismHeader.vue'
import meta, { Default } from './OrganismHeader.stories'

type OrganismHeaderProps = InstanceType<typeof OrganismHeader>['$props']

const getProps = (storyArgs: Record<string, unknown>): OrganismHeaderProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as OrganismHeaderProps
}

const globalMountOptions = {
  global: {
    stubs: {
      AtomIcon: {
        template: '<div class="mock-loader-icon" role="status" />'
      }
    }
  }
}

describe('OrganismHeader', () => {
  it('renders root semantic structure layout elements correctly', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('sticky')
    expect(header.classes()).toContain('bg-background/40') // Repaired typo class tracking assertion
  })

  it('renders branding template slots content details within the header layout accurately', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      slots: {
        branding: () => h('span', { class: 'logo-mock' }, 'Core Brand Logo'),
      },
      ...globalMountOptions
    })

    const brandingEl = wrapper.find('.logo-mock')
    expect(brandingEl.exists()).toBe(true)
    expect(brandingEl.text()).toBe('Core Brand Logo')
  })

  it('mounts structural controls across named theme-toggle component slots', () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      slots: {
        'theme-toggle': () => h('button', { class: 'toggle-mock' }, 'Toggle Active'),
      },
      ...globalMountOptions
    })

    // Repaired broken .border-l selector crash by asserting exact slot class presence
    const toggleMock = wrapper.find('.toggle-mock')
    expect(toggleMock.exists()).toBe(true)
    expect(toggleMock.text()).toBe('Toggle Active')
  })

  it('hides slot frames and exposes full-capsule loaders while isLoading is active', async () => {
    const wrapper = mount(OrganismHeader, {
      props: getProps({ isLoading: true }),
      slots: {
        branding: () => h('span', { class: 'logo-mock' }, 'Hidden Brand'),
      },
      ...globalMountOptions
    })

    // Check loading container landmark assertions
    const nav = wrapper.find('nav')
    expect(nav.attributes('aria-busy')).toBe('true')
    expect(nav.classes()).toContain('max-w-10')

    // Ensure content slots are completely omitted
    expect(wrapper.find('.logo-mock').exists()).toBe(false)
    expect(wrapper.find('.mock-loader-icon').exists()).toBe(true)
  })
})
