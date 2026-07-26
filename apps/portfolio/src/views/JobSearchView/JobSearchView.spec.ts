import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobSearchView from './JobSearchView.vue'
import { Default } from './JobSearchView.stories'


describe('JobSearchView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(JobSearchView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('job-search-view')
  })
})
