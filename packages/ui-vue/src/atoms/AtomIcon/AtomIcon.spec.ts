import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Smile } from '@lucide/vue'
import AtomIcon from './AtomIcon.vue'
import meta, {
  Default,
  LocalSvgAssetPath,
  TextFallbackState,
  CustomNumericSize,
} from './AtomIcon.stories'

type AtomIconProps = InstanceType<typeof AtomIcon>['$props']

const getProps = (storyArgs?: Record<string, unknown>): AtomIconProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomIconProps
}

const globalMountOptions = {
  global: {
    stubs: {
      // Stub the Lucide component node to isolate visual testing pipelines
      Smile: {
        template: '<svg class="mock-lucide-smile"><slot /></svg>',
      },
    },
  },
}

describe('AtomIcon', () => {
  it('renders a custom dynamic icon component correctly when passed down', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="atom-icon"]').exists()).toBe(true)
    expect(wrapper.findComponent(Smile).exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)

    // Ensure decorative vectors stay out of accessibility vocalization layers
    expect(wrapper.find('[data-testid="atom-icon"]').attributes('aria-hidden')).toBe('true')
  })

  it('renders a local string SVG path inside an img tag layout smoothly', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps((LocalSvgAssetPath.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.vm.$nextTick()

    const imgNode = wrapper.find('img')
    expect(imgNode.exists()).toBe(true)
    expect(imgNode.attributes('src')).toBe('/src/assets/images/svgs/vue.svg')

    // Aligned to verify the component's true configuration map ('size-8') instead of breaking 'w-8' styles
    expect(imgNode.classes()).toContain('size-8')
    expect(wrapper.findComponent(Smile).exists()).toBe(false)
  })

  it('falls back seamlessly to rendering text spans if component object is missing', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps((TextFallbackState.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Fallback Text')
    expect(wrapper.find('img').exists()).toBe(false)

    // When text data is printed, aria-hidden should be unset to allow screen reader indexing
    expect(wrapper.find('[data-testid="atom-icon"]').attributes('aria-hidden')).toBeUndefined()
  })

  it('safely pipes pixel sizing attributes as custom inline CSS styles when numbers match', async () => {
    const wrapper = mount(AtomIcon, {
      props: getProps((CustomNumericSize.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.vm.$nextTick()

    // Corrected assertion loops to verify true inline layout widths and heights directly
    const targetVector = wrapper.findComponent(Smile)
    expect(targetVector.exists()).toBe(true)

    const styleAttribute = targetVector.attributes('style')
    expect(styleAttribute).toContain('width: 48px;')
    expect(styleAttribute).toContain('height: 48px;')
  })
})
