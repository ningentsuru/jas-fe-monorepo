import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import MoleculeTechCard from './MoleculeTechCard.vue'
import meta, { Default, AdvancedTier } from './MoleculeTechCard.stories'

type MoleculeTechCardProps = InstanceType<typeof MoleculeTechCard>['$props']

const getProps = (storyArgs: Record<string, unknown>): MoleculeTechCardProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as MoleculeTechCardProps
}

const globalMountOptions = {
  global: {
    stubs: {
      Card: {
        template: '<div class="mock-card"><slot /></div>'
      },
      CardContent: {
        template: '<div class="mock-card-content"><slot /></div>'
      },
      Badge: {
        template: '<span class="mock-badge"><slot /></span>'
      }
    }
  }
}

describe('MoleculeTechCard', () => {
  it('renders core molecule layout container tracking the right test identifier', () => {
    const wrapper = mount(MoleculeTechCard, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    const card = wrapper.find('[data-testid="molecule-tech-card"]')
    expect(card.exists()).toBe(true)
  })

  it('binds and displays the core tech stack name and level badges cleanly', () => {
    const wrapper = mount(MoleculeTechCard, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    expect(wrapper.text()).toContain('Vue.js 3 / Nuxt 4')
    expect(wrapper.find('.mock-badge').text()).toContain('Expert')
  })

  it('renders alternative story configuration datasets smoothly without structural breakdown', () => {
    const wrapper = mount(MoleculeTechCard, {
      props: getProps((AdvancedTier.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    expect(wrapper.text()).toContain('TypeScript / ES2025')
    expect(wrapper.find('.mock-badge').text()).toContain('Advanced')
    expect(wrapper.text()).not.toContain('Vue.js 3 / Nuxt 4')
  })

  it('mounts the structural component icon wrapper into the template tree safely', () => {
    const MockIconComponent = {
      render() {
        return h('svg', { 'data-testid': 'custom-mock-icon' })
      }
    }

    const wrapper = mount(MoleculeTechCard, {
      props: {
        name: 'Custom Tech',
        level: 'Beginner',
        icon: MockIconComponent
      },
      ...globalMountOptions
    })

    expect(wrapper.find('[data-testid="custom-mock-icon"]').exists()).toBe(true)
  })
})
