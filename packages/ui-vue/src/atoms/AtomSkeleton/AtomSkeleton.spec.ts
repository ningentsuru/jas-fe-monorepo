import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomSkeleton from './AtomSkeleton.vue'
import meta, { Default } from './AtomSkeleton.stories'

type AtomSkeletonProps = InstanceType<typeof AtomSkeleton>['$props']

const getProps = (storyArgs: typeof Default.args): AtomSkeletonProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomSkeletonProps
}

describe('AtomSkeleton', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomSkeleton, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('atom-skeleton')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomSkeleton, {
      props: getProps(Default.args),
    })


    // Verify class (string)
    expect(wrapper.props('class')).toEqual('')
  })
})
