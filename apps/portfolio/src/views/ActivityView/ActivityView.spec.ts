import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ActivityView from './ActivityView.vue'
import { Default } from './ActivityView.stories'


describe('ActivityView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(ActivityView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('activity-view')
  })
})
