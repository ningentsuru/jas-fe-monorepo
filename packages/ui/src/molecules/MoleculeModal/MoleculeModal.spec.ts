import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeModal from './MoleculeModal.vue'
import { Default } from './MoleculeModal.stories'

interface defaultProps {
  title: string
}

describe('MoleculeModal', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeModal, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('molecule-modal')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeModal, {
      props: Default.args as defaultProps,
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
  })
})
