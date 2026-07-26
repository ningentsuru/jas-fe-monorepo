import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeTooltip from './MoleculeTooltip.vue'
import { Default } from './MoleculeTooltip.stories'

interface defaultProps {
  title: string, 
  position: string, 
  delay: number
}

describe('MoleculeTooltip', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('molecule-tooltip')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeTooltip, {
      props: Default.args as defaultProps,
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
    // Verify position (string)
    expect(wrapper.props('position')).toEqual('')
    // Verify delay (number)
    expect(wrapper.props('delay')).toEqual(0)
  })
})
