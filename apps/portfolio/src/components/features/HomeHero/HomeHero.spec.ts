import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from './HomeHero.vue'
import { Default } from './HomeHero.stories'


describe('HomeHero', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(HomeHero, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('home-hero')
  })
})
