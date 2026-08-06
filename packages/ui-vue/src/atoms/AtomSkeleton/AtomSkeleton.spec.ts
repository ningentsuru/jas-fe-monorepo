import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomSkeleton from './AtomSkeleton.vue'

const globalMountOptions = {
  global: {
    stubs: {
      Skeleton: {
        template: '<div class="mock-skeleton-primitive"><slot /></div>',
      },
    },
  },
}

describe('AtomSkeleton Clean Attribute Inheritance', () => {
  it('renders properly and presents valid accessibility role identifiers', () => {
    const wrapper = mount(AtomSkeleton, {
      ...globalMountOptions,
    })

    const skeletonContainer = wrapper.find('[data-testid="atom-skeleton"]')
    expect(skeletonContainer.exists()).toBe(true)
    expect(skeletonContainer.attributes('role')).toBe('img')
  })

  it('inherits native class bindings correctly via attribute fall-through rules', () => {
    const wrapper = mount(AtomSkeleton, {
      attrs: {
        class: 'size-12 rounded-full',
      },
      ...globalMountOptions,
    })

    const skeletonContainer = wrapper.find('[data-testid="atom-skeleton"]')

    expect(skeletonContainer.classes()).toContain('atom-skeleton')
    expect(skeletonContainer.classes()).toContain('size-12')
    expect(skeletonContainer.classes()).toContain('rounded-full')
  })
})
