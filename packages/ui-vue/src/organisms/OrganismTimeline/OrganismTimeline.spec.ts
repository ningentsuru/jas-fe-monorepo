import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismTimeline from './OrganismTimeline.vue'
import meta, { Default } from './OrganismTimeline.stories'

type OrganismTimelineProps = InstanceType<typeof OrganismTimeline>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismTimelineProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismTimelineProps
}

describe('OrganismTimeline', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismTimeline, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('organism-timeline')
  })
})
