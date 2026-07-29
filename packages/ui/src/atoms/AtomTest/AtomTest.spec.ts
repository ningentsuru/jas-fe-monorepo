import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomTest from './AtomTest.vue'
import meta, { Default } from './AtomTest.stories'

type AtomTestProps = InstanceType<typeof AtomTest>['$props']

const getProps = (storyArgs: typeof Default.args): AtomTestProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomTestProps
}

describe('AtomTest', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomTest, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('atom-test')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomTest, {
      props: getProps(Default.args),
    })


    // Verify title (string)
    expect(wrapper.props('title')).toEqual('')
    // Verify count (number)
    expect(wrapper.props('count')).toEqual(0)
    // Verify size (string)
    expect(wrapper.props('size')).toEqual('sm')
  })
})
