import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemplateProfile from './TemplateProfile.vue'
import { Default } from './TemplateProfile.stories'


describe('TemplateProfile', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TemplateProfile, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('template-profile')
  })
})
