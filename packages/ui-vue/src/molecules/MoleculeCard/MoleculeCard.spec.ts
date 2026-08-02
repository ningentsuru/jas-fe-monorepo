import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeCard from './MoleculeCard.vue'
import { Default } from './MoleculeCard.stories'


describe('MoleculeCard', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeCard, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('molecule-card')
  })
})
