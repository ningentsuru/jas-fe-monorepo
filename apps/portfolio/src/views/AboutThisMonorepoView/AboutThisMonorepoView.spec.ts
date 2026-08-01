import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutThisMonorepoView from './AboutThisMonorepoView.vue'
import { Default } from './AboutThisMonorepoView.stories'

describe('AboutThisMonorepoView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AboutThisMonorepoView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('about-this-monorepo-view')
  })
})
