import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HisCvView from './HisCvView.vue'
import { Default } from './HisCvView.stories'


describe('HisCvView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(HisCvView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('his-cv-view')
  })
})
