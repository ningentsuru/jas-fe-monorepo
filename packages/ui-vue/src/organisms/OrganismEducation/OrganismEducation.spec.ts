import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismEducation from './OrganismEducation.vue'
import { Default } from './OrganismEducation.stories'


describe('OrganismEducation', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismEducation, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-education')
  })
})
