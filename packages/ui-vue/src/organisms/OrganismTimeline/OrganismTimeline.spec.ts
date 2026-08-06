import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismTimeline from './OrganismTimeline.vue'
import meta, { Default, Loading, Empty } from './OrganismTimeline.stories'

type OrganismTimelineProps = InstanceType<typeof OrganismTimeline>['$props']

const getProps = (storyArgs: Record<string, any>): OrganismTimelineProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as OrganismTimelineProps
}

describe('OrganismTimeline', () => {
  it('renders the core component container matching the test ID', () => {
    const wrapper = mount(OrganismTimeline, {
      props: getProps(Default.args || {}),
    })

    const section = wrapper.find('[data-testid="organism-timeline"]')
    expect(section.exists()).toBe(true)
  })

  it('displays job timeline items completely when not loading', () => {
    const wrapper = mount(OrganismTimeline, {
      props: getProps(Default.args || {}),
    })

    // Validate structured typography data outputs
    expect(wrapper.text()).toContain('Senior Frontend Engineer')
    expect(wrapper.text()).toContain('at TechCorp Solutions')
    expect(wrapper.text()).toContain('2024 — Present')

    // Check metric listings are accurately parsed
    expect(wrapper.text()).toContain('Led migration of monolithic dashboard to Vue 3 and Vite')

    // Ensure skeleton markup is hidden when items exist
    expect(wrapper.find('.animate-pulse').exists()).toBe(false)
  })

  it('renders skeleton states and masks raw content while loading', () => {
    const wrapper = mount(OrganismTimeline, {
      props: getProps(Loading.args || {}),
    })

    // Check skeleton presentation configurations
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true)

    // Ensure active metrics details are kept out of sight
    expect(wrapper.text()).not.toContain('Senior Frontend Engineer')
    expect(wrapper.text()).not.toContain('Production Impacts')
  })

  it('renders gracefully without crashing when provided an empty items array', () => {
    const wrapper = mount(OrganismTimeline, {
      props: getProps(Empty.args || {}),
    })

    expect(wrapper.find('[data-testid="organism-timeline"]').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('at TechCorp Solutions')
  })
})
