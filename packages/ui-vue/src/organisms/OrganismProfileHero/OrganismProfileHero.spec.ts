import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismProfileHero from './OrganismProfileHero.vue'
import { Default } from './OrganismProfileHero.stories'


describe('OrganismProfileHero', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismProfileHero, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-profile-hero')
  })
})
