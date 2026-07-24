import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeThemeToggle from './MoleculeThemeToggle.vue'
import { Default } from './MoleculeThemeToggle.stories'

interface defaultProps {
  isToggled: boolean, 
  size: string
}

describe('MoleculeThemeToggle', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('molecule-theme-toggle')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: Default.args as defaultProps,
    })


    // Verify isToggled (boolean)
    expect(wrapper.props('isToggled')).toEqual(false)
    // Verify size (string)
    expect(wrapper.props('size')).toEqual('')
  })
})
