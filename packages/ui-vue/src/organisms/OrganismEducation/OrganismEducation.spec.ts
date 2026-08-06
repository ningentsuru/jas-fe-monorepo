import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismEducation from './OrganismEducation.vue'
import meta, { Default } from './OrganismEducation.stories'

type OrganismEducationProps = InstanceType<typeof OrganismEducation>['$props']

const getProps = (storyArgs: Record<string, unknown>): OrganismEducationProps => {
  return { ...meta.args, ...storyArgs } as unknown as OrganismEducationProps
}

const globalMountOptions = {
  global: {
    stubs: {
      AtomSkeleton: { template: '<div class="mock-skeleton" />' }
    }
  }
}

describe('OrganismEducation', () => {
  it('renders injected array institutional details correctly from decoupled parameters', () => {
    const wrapper = mount(OrganismEducation, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    const text = wrapper.text()
    expect(text).toContain('Bachelor of Science in Information Technology')
    expect(text).toContain('STI Academic Center - Las Piñas')
    expect(text).toContain('Transferred')
  })
})
