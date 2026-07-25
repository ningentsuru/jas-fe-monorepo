import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismHero from './OrganismHero.vue'
import { Default } from './OrganismHero.stories'

interface defaultProps {
  title: string
}

describe('OrganismHero', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismHero, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('organism-hero')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismHero, {
      props: Default.args as defaultProps,
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
  })
})
