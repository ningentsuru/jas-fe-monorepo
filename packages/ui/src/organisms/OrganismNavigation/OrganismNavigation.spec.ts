import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismNavigation from './OrganismNavigation.vue'
import meta, { Default, EmptyShellState } from './OrganismNavigation.stories'

type OrganismNavigationProps = InstanceType<typeof OrganismNavigation>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismNavigationProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismNavigationProps
}

describe('OrganismNavigation', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders root navigation wrapper component correctly', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: {
          MoleculeNavDropdown: true,
          MoleculeNavAccordion: true,
          AtomButton: true,
          transition: { template: '<slot />' },
        },
      },
    })

    const navEl = wrapper.find('[data-testid="organism-navigation"]')
    expect(navEl.exists()).toBe(true)
    expect(wrapper.find('.sr-only').text()).toBe('organism-navigation')
  })

  it('receives correct structural items array matching Storybook configurations', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    expect(wrapper.props('items')).toBeDefined()
    expect(wrapper.props('items').length).toBe(4)
    expect(wrapper.props('items')[1].label).toBe('Services Matrix')
  })

  it('handles rendering loop iterations for desktop dropdown child elements cleanly', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: {
          MoleculeNavDropdown: { template: '<div class="mock-dropdown"></div>' },
          MoleculeNavAccordion: true,
          AtomButton: true,
        },
      },
    })

    const dropdowns = wrapper.findAll('.mock-dropdown')
    expect(dropdowns.length).toBe(4)
  })

  it('keeps mobile layout drawers fully closed on initial rendering execution paths', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('mounts the mobile drawer dialog and locks parent layouts when toggled', async () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: {
          MoleculeNavDropdown: true,
          MoleculeNavAccordion: true,
          transition: { template: '<slot />' },
          AtomButton: true,
          Teleport: true,
        },
      },
    })

    await (wrapper.vm as any).toggleMobile()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    await (wrapper.vm as any).closeMobile()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(document.body.style.overflow).toBe('')
  })

  it('closes active layout trees automatically when clicking outside the menu element context', async () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    document.dispatchEvent(new MouseEvent('click'))
    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).openDropdownIndex).toBeNull()
  })

  it('safely intercepts document hardware Escape clicks to clear active states', async () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).openDropdownIndex).toBeNull()
    expect((wrapper.vm as any).isMobileOpen).toBe(false)
  })

  it('safely handles empty props configuration fallback definitions', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(EmptyShellState.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    expect(wrapper.props('items')).toEqual([])
  })
})
