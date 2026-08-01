import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from './DefaultLayout.vue'
import { Default } from './DefaultLayout.stories'

describe('DefaultLayout', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(DefaultLayout, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('default-layout')
  })
})
