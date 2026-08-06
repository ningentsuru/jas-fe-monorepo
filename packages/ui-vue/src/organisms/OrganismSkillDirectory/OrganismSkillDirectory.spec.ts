import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismSkillDirectory from './OrganismSkillDirectory.vue'
import meta, { Default } from './OrganismSkillDirectory.stories'

type OrganismSkillDirectoryProps = InstanceType<typeof OrganismSkillDirectory>['$props']

const getProps = (storyArgs: Record<string, unknown>): OrganismSkillDirectoryProps => {
  return { ...meta.args, ...storyArgs } as unknown as OrganismSkillDirectoryProps
}

const globalMountOptions = {
  global: {
    stubs: {
      Button: { template: '<button><slot /></button>' },
      MoleculeTechCard: { props: ['name'], template: '<div class="mock-tech-card">{{ name }}</div>' },
      AtomSkeleton: { template: '<div class="mock-skeleton" />' }
    }
  }
}

describe('OrganismSkillDirectory', () => {
  it('reactively filters child components based on dynamic category selections passed by props', async () => {
    const wrapper = mount(OrganismSkillDirectory, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    expect(wrapper.findAll('.mock-tech-card').length).toBe(4)

    const aiButton = wrapper.findAll('button').find(b => b.text().includes('AI Operations'))
    await aiButton!.trigger('click')

    expect(wrapper.findAll('.mock-tech-card').length).toBe(1)
    expect(wrapper.text()).toContain('Claude Code / Copilot')
  })
})
