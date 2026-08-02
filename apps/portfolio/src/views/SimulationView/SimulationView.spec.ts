import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SimulationView from './SimulationView.vue'
import { Default } from './SimulationView.stories'


describe('SimulationView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(SimulationView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('simulation-view')
  })
})
