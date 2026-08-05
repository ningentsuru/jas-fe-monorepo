import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismTimeline from './OrganismTimeline.vue'
import { Default } from './OrganismTimeline.stories'


describe('OrganismTimeline', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismTimeline, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-timeline')
  })
})
