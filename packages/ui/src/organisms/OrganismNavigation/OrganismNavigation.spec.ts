import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrganismNavigation } from './OrganismNavigation'
import meta, { Default } from './OrganismNavigation.stories'

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

    const items = wrapper.props('items')

    expect(items).toBeDefined()
    if (!items) throw new Error('Props items should be defined')

    expect(items.length).toBe(4)
    expect(items[1].label).toBe('Services Matrix')
  })

  it('handles rendering loop iterations for desktop dropdown child elements cleanly', () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    const dropdowns = wrapper.findAllComponents({ name: 'MoleculeNavDropdown' })
    expect(dropdowns.length).toBe(4)
  })

  it('toggles mobile drawer overlay visibility attributes smoothly on menu button interaction triggers', async () => {
    const wrapper = mount(OrganismNavigation, {
      props: getProps(Default.args),
      global: {
        stubs: { MoleculeNavDropdown: true, MoleculeNavAccordion: true, AtomButton: true },
      },
    })

    expect(wrapper.find('.data-mobile-dialog').exists()).toBe(false)

    const openBtn = wrapper.find('[data-testid="mobile-open-btn"]')
    await openBtn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.data-mobile-dialog').exists()).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')

    const closeBtn = wrapper.find('[data-testid="mobile-close-btn"]')
    await closeBtn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.data-mobile-dialog').exists()).toBe(false)
    expect(document.body.style.overflow).toBe('')
  })
})
