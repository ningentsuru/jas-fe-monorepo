import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismHeader from './OrganismHeader.vue'
import { Default } from './OrganismHeader.stories'


describe('OrganismHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-header')
  })
})
