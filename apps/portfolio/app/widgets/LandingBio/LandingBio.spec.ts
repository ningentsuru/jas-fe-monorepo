import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingBio from './LandingBio.vue'
import meta, { Default } from './LandingBio.stories'

type LandingBioProps = InstanceType<typeof LandingBio>['$props']

const getProps = (storyArgs: Record<string, unknown>): LandingBioProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as LandingBioProps
}

// Global stubs to completely shield layout orchestration from deeply nested libraries
const globalMountOptions = {
  global: {
    stubs: {
      OrganismProfileHero: {
        props: ['profile', 'isLoading'],
        template: '<div class="mock-hero" :data-loading="isLoading">{{ profile?.fullName }}</div>'
      },
      OrganismSkillDirectory: {
        props: ['categories', 'techStack', 'isLoading'],
        template: '<div class="mock-skills" :data-loading="isLoading">Skills Counts: {{ techStack?.length }}</div>'
      },
      OrganismTimeline: {
        props: ['items', 'isLoading'],
        template: '<div class="mock-timeline" :data-loading="isLoading">Jobs Counts: {{ items?.length }}</div>'
      },
      OrganismEducation: {
        props: ['education', 'isLoading'],
        template: '<div class="mock-education" :data-loading="isLoading">{{ education?.title }}</div>'
      }
    }
  }
}

describe('LandingBio', () => {
  it('renders core feature container tracking the exact data-testid matching rule', () => {
    const wrapper = mount(LandingBio, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    const wrapperNode = wrapper.find('[data-testid="landing-bio"]')
    expect(wrapperNode.exists()).toBe(true)
  })

  it('initially mounts child structures under an active loading state before client hydrations', () => {
    const wrapper = mount(LandingBio, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    // On setup instantiation, isClientReady defaults to false. Children should receive loading state.
    expect(wrapper.find('.mock-hero').attributes('data-loading')).toBe('true')
    expect(wrapper.find('.mock-skills').attributes('data-loading')).toBe('true')
    expect(wrapper.find('.mock-timeline').attributes('data-loading')).toBe('true')
    expect(wrapper.find('.mock-education').attributes('data-loading')).toBe('true')
  })

  it('hydrates smoothly and passes down complex configuration models upon component mounting', async () => {
    const wrapper = mount(LandingBio, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    // Await structural mount transitions to trigger onMounted macro state shifts
    await wrapper.vm.$nextTick()

    // Verify loading indicators are deactivated
    expect(wrapper.find('.mock-hero').attributes('data-loading')).toBe('false')
    
    // Verify properties parse cleanly into target nested layers
    const text = wrapper.text()
    expect(text).toContain('Joshua Alexis Natividad Sardido')
    expect(text).toContain('Skills Counts: 11')
    expect(text).toContain('Jobs Counts: 5')
    expect(text).toContain('Bachelor of Science in Information Technology')
  })
})
