import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeTechCard from './MoleculeTechCard.vue'
import meta, { Default } from './MoleculeTechCard.stories'

type MoleculeTechCardProps = InstanceType<typeof MoleculeTechCard>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeTechCardProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeTechCardProps
}

describe('MoleculeTechCard', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeTechCard, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('organism-timeline')
  })
})
