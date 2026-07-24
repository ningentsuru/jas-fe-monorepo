import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomSelect from './AtomSelect.vue'
import { Default } from './AtomSelect.stories'

interface defaultProps {
  modelValue: string, 
  options: object[]
}

describe('AtomSelect', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomSelect, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('atom-select')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomSelect, {
      props: Default.args as defaultProps,
    })


    // Verify modelValue (string)
    expect(wrapper.props('modelValue')).toEqual('')
    // Verify options (object[])
    expect(wrapper.props('options')).toEqual([{}])
  })
})
