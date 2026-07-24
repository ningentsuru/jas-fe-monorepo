import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from './AtomButton.vue'
import { Default } from './AtomButton.stories'

interface defaultProps {
  size: string
}

describe('AtomButton', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomButton, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-button')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomButton, {
      props: Default.args as defaultProps,
    })


    // Verify size (string)
    expect(wrapper.props('size')).toEqual('')
  })
})
