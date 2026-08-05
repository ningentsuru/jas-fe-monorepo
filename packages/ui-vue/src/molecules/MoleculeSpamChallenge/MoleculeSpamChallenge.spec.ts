import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeSpamChallenge from './MoleculeSpamChallenge.vue'
import meta, { Default } from './MoleculeSpamChallenge.stories'

type MoleculeSpamChallengeProps = InstanceType<typeof MoleculeSpamChallenge>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeSpamChallengeProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeSpamChallengeProps
}

describe('MoleculeSpamChallenge', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('organism-timeline')
  })
})
