import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomIcon from './AtomIcon.vue'
import { Default } from './AtomIcon.stories'

interface defaultProps {
  name: string, 
  size: string
}

describe('AtomIcon', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomIcon, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-icon')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomIcon, {
      props: Default.args as defaultProps,
    })


    // Verify name (string)
    expect(wrapper.props('name')).toEqual('')
    // Verify size (string)
    expect(wrapper.props('size')).toEqual('')
  })
})
