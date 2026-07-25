import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismNavigation from './OrganismNavigation.vue'
import { Default } from './OrganismNavigation.stories'

interface defaultProps {
  items: object[]
}

describe('OrganismNavigation', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismNavigation, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('organism-navigation')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismNavigation, {
      props: Default.args as defaultProps,
    })


    // Verify items (object[])
    expect(wrapper.props('items')).toEqual([{}])
  })
})
