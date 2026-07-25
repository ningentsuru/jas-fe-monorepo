import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeNavDropdown from './MoleculeNavDropdown.vue'
import { Default } from './MoleculeNavDropdown.stories'

interface defaultProps {
  item: object, 
  index: number, 
  isOpen: boolean
}

describe('MoleculeNavDropdown', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('molecule-nav-dropdown')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeNavDropdown, {
      props: Default.args as defaultProps,
    })


    // Verify item (object)
    expect(wrapper.props('item')).toEqual({})
    // Verify index (number)
    expect(wrapper.props('index')).toEqual(0)
    // Verify isOpen (boolean)
    expect(wrapper.props('isOpen')).toEqual(false)
  })
})
