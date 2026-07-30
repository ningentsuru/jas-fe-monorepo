import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AbouteMeView from './AboutMeView.vue'
import { Default } from './AboutMeView.stories'

describe('AbouteMeView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AbouteMeView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('about-me-view')
  })
})
