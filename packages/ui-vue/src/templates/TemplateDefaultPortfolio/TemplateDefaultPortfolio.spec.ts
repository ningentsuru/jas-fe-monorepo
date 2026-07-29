import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import TemplateDefaultPortfolio from './TemplateDefaultPortfolio.vue'

describe('TemplateDefaultPortfolio', () => {
  it('renders root container layout structure and nested slots cleanly', () => {
    const wrapper = mount(TemplateDefaultPortfolio, {
      slots: {
        header: () => h('header', 'Mock Header'),
        default: () => h('main', 'Mock Content Body'),
        footer: () => h('footer', 'Mock Footer'),
      },
    })

    expect(wrapper.find('[data-testid="template-default-portfolio"]').exists()).toBe(true)
    expect(wrapper.find('.sr-only').text()).toBe('template-default-portfolio')
    expect(wrapper.text()).toContain('Mock Header')
    expect(wrapper.text()).toContain('Mock Content Body')
    expect(wrapper.text()).toContain('Mock Footer')
  })
})
