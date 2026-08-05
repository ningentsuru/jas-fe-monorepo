import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismSkillDirectory from './OrganismSkillDirectory.vue'
import { Default } from './OrganismSkillDirectory.stories'


describe('OrganismSkillDirectory', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismSkillDirectory, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-skill-directory')
  })
})
