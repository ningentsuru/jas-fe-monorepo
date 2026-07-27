import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFoundView from './NotFoundView.vue'
import { Default } from './NotFoundView.stories'


describe('NotFoundView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(NotFoundView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('not-found-view')
  })
})
