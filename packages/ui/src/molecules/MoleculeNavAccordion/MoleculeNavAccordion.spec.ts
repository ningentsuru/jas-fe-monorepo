import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeNavAccordion from './MoleculeNavAccordion.vue'
import { Default } from './MoleculeNavAccordion.stories'

interface defaultProps {
  item: object, 
  isOpen: boolean
}

describe('MoleculeNavAccordion', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('molecule-nav-accordion')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeNavAccordion, {
      props: Default.args as defaultProps,
    })


    // Verify item (object)
    expect(wrapper.props('item')).toEqual({})
    // Verify isOpen (boolean)
    expect(wrapper.props('isOpen')).toEqual(false)
  })
})
