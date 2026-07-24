import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismFooter from './OrganismFooter.vue'
import { Default } from './OrganismFooter.stories'

interface defaultProps {
  title: string
}

describe('OrganismFooter', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismFooter, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('organism-footer')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismFooter, {
      props: Default.args as defaultProps,
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
  })
})
