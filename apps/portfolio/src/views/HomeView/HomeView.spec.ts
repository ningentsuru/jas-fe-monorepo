import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from './HomeView.vue'
import { Default } from './HomeView.stories'


describe('HomeView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(HomeView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('home-view')
  })
})
