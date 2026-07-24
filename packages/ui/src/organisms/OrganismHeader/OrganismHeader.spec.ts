import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismHeader from './OrganismHeader.vue'
import { Default } from './OrganismHeader.stories'

interface defaultProps {
  title: string
}

describe('OrganismHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismHeader, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('organism-header')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismHeader, {
      props: Default.args as defaultProps,
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
  })
})
