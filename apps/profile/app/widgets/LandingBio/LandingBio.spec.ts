import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingBio from './LandingBio.vue'
import { Default } from './LandingBio.stories'


describe('LandingBio', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(LandingBio, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('feature-landing')
  })
})
