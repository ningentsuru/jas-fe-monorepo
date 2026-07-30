import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HisCvView from './CvView.vue'
import { Default } from './CvView.stories'

describe('HisCvView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(HisCvView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('cv-view')
  })
})
