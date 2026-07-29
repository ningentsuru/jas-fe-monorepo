import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { MoleculeNavDropdown } from './MoleculeNavDropdown'
import meta, { Default, OpenedDropdown, SingleLinkNoDropdown } from './MoleculeNavDropdown.stories'

type MoleculeNavDropdownProps = InstanceType<typeof MoleculeNavDropdown>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeNavDropdownProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeNavDropdownProps
}

describe('MoleculeNavDropdown', () => {
  it('renders dropdown root element and base title labels correctly', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="molecule-nav-dropdown"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Products')
  })

  it('receives correct configuration parameters from story inputs', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(OpenedDropdown.args),
    })

    expect(wrapper.props('isOpen')).toBe(true)
    expect(wrapper.props('index')).toBe(2)
  })

  it('renders child list anchors cleanly through custom AtomNavLink sub-components', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(OpenedDropdown.args),
    })

    const links = wrapper.findAllComponents({ name: 'AtomNavLink' })
    expect(links.length).toBe(3)
    expect(wrapper.text()).toContain('Web Applications')
    expect(wrapper.text()).toContain('Cloud Architecture')
  })

  it('hides popover panels using visibility layout classes when marked closed', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(Default.args),
    })

    const dropdownContainer = wrapper.find('.absolute')
    expect(dropdownContainer.classes()).toContain('invisible')
    expect(dropdownContainer.classes()).toContain('scale-95')
    expect(dropdownContainer.classes()).toContain('opacity-0')
  })

  it('swaps popover classes instantly when active visibility variables become true', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(OpenedDropdown.args),
    })

    const dropdownContainer = wrapper.find('.absolute')
    expect(dropdownContainer.classes()).toContain('visible')
    expect(dropdownContainer.classes()).toContain('scale-100')
    expect(dropdownContainer.classes()).toContain('opacity-100')
  })

  it('bubbles structural toggle notifications upward including parameters on click actions', async () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(Default.args),
    })

    const button = wrapper.findComponent({ name: 'AtomButton' })
    await button.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')?.[0]).toEqual([2])
  })

  it('skips toggle updates entirely if triggering a simple non-dropdown parameter link', async () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(SingleLinkNoDropdown.args),
    })

    const button = wrapper.findComponent({ name: 'AtomButton' })
    await button.trigger('click')

    expect(wrapper.emitted('toggle')).toBeFalsy()
  })

  it('bubbles navigate actions when clicking individual dropdown nested option links', async () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: getProps(OpenedDropdown.args),
    })

    const childLink = wrapper.findAllComponents({ name: 'AtomNavLink' }).at(0)
    await childLink?.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
  })
})
