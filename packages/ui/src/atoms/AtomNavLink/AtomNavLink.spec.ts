import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomNavLink from './AtomNavLink.vue'
import { Default } from './AtomNavLink.stories'

interface defaultProps {
  label: string, 
  href: string, 
  to: string, 
  variant: string, 
  size: string, 
  active: boolean
}

describe('AtomNavLink', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomNavLink, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-nav-link')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomNavLink, {
      props: Default.args as defaultProps,
    })


    // Verify label (string)
    expect(wrapper.props('label')).toEqual('')
    // Verify href (string)
    expect(wrapper.props('href')).toEqual('')
    // Verify to (string)
    expect(wrapper.props('to')).toEqual('')
    // Verify variant (string)
    expect(wrapper.props('variant')).toEqual('')
    // Verify size (string)
    expect(wrapper.props('size')).toEqual('')
    // Verify active (boolean)
    expect(wrapper.props('active')).toEqual(false)
  })
})
