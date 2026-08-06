import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutMe from './AboutMe.vue'
import { Default } from './AboutMe.stories'


describe('AboutMe', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AboutMe, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('feature-about-me')
  })
})
