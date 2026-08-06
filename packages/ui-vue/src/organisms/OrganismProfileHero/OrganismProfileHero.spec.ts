import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismProfileHero from './OrganismProfileHero.vue'
import meta, { Default, Loading } from './OrganismProfileHero.stories'

type OrganismProfileHeroProps = InstanceType<typeof OrganismProfileHero>['$props']

const getProps = (storyArgs: Record<string, unknown>): OrganismProfileHeroProps => {
  return { ...meta.args, ...storyArgs } as unknown as OrganismProfileHeroProps
}

const globalMountOptions = {
  global: {
    stubs: {
      Badge: { template: '<div class="mock-badge"><slot /></div>' },
      AtomSkeleton: { template: '<div class="mock-skeleton" />' }
    }
  }
}

describe('OrganismProfileHero', () => {
  it('renders structural branding data from the passed props data layer', () => {
    const wrapper = mount(OrganismProfileHero, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    expect(wrapper.find('[data-testid="organism-profile-hero"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Joshua Alexis Natividad Sardido')
    expect(wrapper.find('a[href="tel:09174028632"]').exists()).toBe(true)
  })

  it('hides strings and unmounts targets entirely while loading is processing', () => {
    const wrapper = mount(OrganismProfileHero, {
      props: getProps((Loading.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions
    })

    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Joshua Alexis Natividad Sardido')
  })
})
