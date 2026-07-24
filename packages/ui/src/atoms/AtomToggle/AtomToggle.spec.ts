import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomToggle from './AtomToggle.vue'
import { Default } from './AtomToggle.stories'

interface defaultProps {
  icon: string, 
  isToggled: boolean, 
  size: string
}

describe('AtomToggle', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomToggle, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-toggle')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomToggle, {
      props: Default.args as defaultProps,
    })


    // Verify icon (string)
    expect(wrapper.props('icon')).toEqual('')
    // Verify isToggled (boolean)
    expect(wrapper.props('isToggled')).toEqual(false)
    // Verify size (string)
    expect(wrapper.props('size')).toEqual('')
  })
})
