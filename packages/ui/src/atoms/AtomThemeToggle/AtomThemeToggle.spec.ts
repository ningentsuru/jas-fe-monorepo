import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomThemeToggle from './AtomThemeToggle.vue'
import { Default } from './AtomThemeToggle.stories'

interface defaultProps {
  isDark: boolean
}

describe('AtomThemeToggle', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomThemeToggle, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-theme-toggle')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomThemeToggle, {
      props: Default.args as defaultProps,
    })


    // Verify isDark (boolean)
    expect(wrapper.props('isDark')).toEqual(false)
  })
})
