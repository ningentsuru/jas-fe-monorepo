import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AtomIcon } from '../../'
import MoleculeQuadrantIcon from './MoleculeQuadrantIcon.vue'
import meta, { Default } from './MoleculeQuadrantIcon.stories'

type MoleculeQuadrantIconProps = InstanceType<typeof MoleculeQuadrantIcon>['$props']

const getProps = (storyArgs?: Record<string, unknown>): MoleculeQuadrantIconProps => {
  return {
    ...meta.args,
    ...Default.args,
    ...storyArgs,
  } as MoleculeQuadrantIconProps
}

describe('MoleculeQuadrantIcon', () => {
  it('renders the core 4-slice quadrant layout frame smoothly with direct tuple tracking maps', async () => {
    const wrapper = mount(MoleculeQuadrantIcon, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const hostNode = wrapper.find('[data-testid="quadrant-icon"]')
    expect(hostNode.exists()).toBe(true)
    expect(hostNode.classes()).toContain('rounded-full')

    const sliceWrappers = hostNode.findAll('[style*="clip-path"]')
    expect(sliceWrappers.length).toBe(4)

    const atomicIcons = wrapper.findAllComponents(AtomIcon)
    expect(atomicIcons.length).toBe(4)
  })

  it('adapts its structural border configuration to square layout states seamlessly', async () => {
    const wrapper = mount(MoleculeQuadrantIcon, {
      props: getProps({ shape: 'square' }),
    })

    await wrapper.vm.$nextTick()

    const hostNode = wrapper.find('[data-testid="quadrant-icon"]')
    expect(hostNode.classes()).toContain('rounded-none')
    expect(hostNode.classes()).not.toContain('rounded-full')
  })

  it('pipes geometric inline clip styles accurately matching slice quadrant parameters', async () => {
    const wrapper = mount(MoleculeQuadrantIcon, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const slices = wrapper.find('[data-testid="quadrant-icon"]').findAll('[style*="clip-path"]')

    const topLeftElement = slices[0].element as HTMLElement
    const bottomRightElement = slices[3].element as HTMLElement

    // 🥇 Fixed: Reverted back to exact unitless format strings matching your template output!
    expect(topLeftElement.style.clipPath).toBe('inset(0 50% 50% 0)')
    expect(bottomRightElement.style.clipPath).toBe('inset(50% 0 0 50%)')
  })
})
