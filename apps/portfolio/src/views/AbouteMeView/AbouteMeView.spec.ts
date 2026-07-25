import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AbouteMeView from './AbouteMeView.vue'
import { Default } from './AbouteMeView.stories'


describe('AbouteMeView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AbouteMeView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('aboute-me-view')
  })
})
