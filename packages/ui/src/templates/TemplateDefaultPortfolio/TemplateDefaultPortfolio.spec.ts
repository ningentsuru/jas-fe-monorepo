import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemplateDefaultPortfolio from './TemplateDefaultPortfolio.vue'
import { Default } from './TemplateDefaultPortfolio.stories'


describe('TemplateDefaultPortfolio', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TemplateDefaultPortfolio, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('template-default-portfolio')
  })
})
