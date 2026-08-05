import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeSpamChallenge from './MoleculeSpamChallenge.vue'
import { Default } from './MoleculeSpamChallenge.stories'


describe('MoleculeSpamChallenge', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('molecule-spam-challenge')
  })
})
