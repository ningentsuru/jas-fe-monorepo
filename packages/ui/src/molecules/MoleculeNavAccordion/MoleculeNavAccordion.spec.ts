import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeNavAccordion from './MoleculeNavAccordion.vue'
import meta, {
  Default,
  ExpandedDropdown,
  SingleLinkNoChildren,
} from './MoleculeNavAccordion.stories'

type MoleculeNavAccordionProps = InstanceType<typeof MoleculeNavAccordion>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeNavAccordionProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeNavAccordionProps
}

describe('MoleculeNavAccordion', () => {
  it('renders root layout block and primary labels accurately', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="molecule-nav-accordion"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Engineering Space')
  })

  it('verifies configuration props pass through securely matching types', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(ExpandedDropdown.args),
    })

    expect(wrapper.props('isOpen')).toBe(true)
    expect(wrapper.props('item').label).toBe('Engineering Space')
  })

  it('renders sub-item list mapping nodes correctly when children are present', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(ExpandedDropdown.args),
    })

    const childrenLinks = wrapper.findAllComponents({ name: 'AtomNavLink' })

    // Total count includes 1 root link item + 3 child links = 4 total link elements
    expect(childrenLinks.length).toBe(4)
    expect(wrapper.text()).toContain('Component Atoms')
    expect(wrapper.text()).toContain('Molecules Matrix')
  })

  it('hides transition panel grids from view when marked closed', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(Default.args),
    })

    const transitionPanel = wrapper.find('[id^="accordion-menu-"]')
    expect(transitionPanel.classes()).toContain('grid-rows-[0fr]')
    expect(transitionPanel.classes()).toContain('invisible')
    expect(transitionPanel.classes()).toContain('opacity-0')
  })

  it('updates panel class attributes to track visibility states when open', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(ExpandedDropdown.args),
    })

    const transitionPanel = wrapper.find('[id^="accordion-menu-"]')
    expect(transitionPanel.classes()).toContain('grid-rows-[1fr]')
    expect(transitionPanel.classes()).toContain('visible')
    expect(transitionPanel.classes()).toContain('opacity-100')
  })

  it('bubbles a toggle execution request upward when clicking items with child references', async () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(Default.args),
    })

    const rootLink = wrapper.findAllComponents({ name: 'AtomNavLink' }).at(0)
    await rootLink?.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('navigate')).toBeFalsy()
  })

  it('bubbles navigate triggers straight out if a basic single link configuration is activated', async () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: getProps(SingleLinkNoChildren.args),
    })

    const rootLink = wrapper.findAllComponents({ name: 'AtomNavLink' }).at(0)
    await rootLink?.trigger('click')

    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('toggle')).toBeFalsy()
  })
})
