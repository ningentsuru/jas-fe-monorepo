import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeTechCard from './MoleculeTechCard.vue'
import { Default } from './MoleculeTechCard.stories'


describe('MoleculeTechCard', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeTechCard, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('molecule-tech-card')
  })
})
