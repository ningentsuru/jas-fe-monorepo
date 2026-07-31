import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MultiZonesView from './MultiZonesView.vue'
import { Default } from './MultiZonesView.stories'


describe('MultiZonesView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MultiZonesView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('multi-zones-view')
  })
})
