import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureSimulatePurchase from './FeatureSimulatePurchase.vue'
import { Default } from './FeatureSimulatePurchase.stories'


describe('FeatureSimulatePurchase', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(FeatureSimulatePurchase, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('feature-simulate-purchase')
  })
})
