import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomWordSwap from './AtomWordSwap.vue'
import { Default } from './AtomWordSwap.stories'

interface defaultProps {
  word: string
}

describe('AtomWordSwap', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomWordSwap, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-word-swap')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomWordSwap, {
      props: Default.args as defaultProps,
    })


    // Verify word (string)
    expect(wrapper.props('word')).toEqual('')
  })
})
