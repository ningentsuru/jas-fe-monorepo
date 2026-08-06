import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeThemeToggle from './MoleculeThemeToggle.vue'
import meta, { Default, DarkModeActive, CustomForestTheme } from './MoleculeThemeToggle.stories'

type MoleculeThemeToggleProps = InstanceType<typeof MoleculeThemeToggle>['$props']

const getProps = (storyArgs: Record<string, unknown>): MoleculeThemeToggleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as MoleculeThemeToggleProps
}

const globalMountOptions = {
  global: {
    stubs: {
      AtomToggle: {
        name: 'AtomToggle',
        props: ['isToggled', 'size', 'icon'],
        template: `
          <button
            class="mock-atom-toggle"
            @click="$emit('toggle')"
            @contextmenu.prevent="$emit('long-toggle')"
          >
            Mock Toggle button
          </button>
        `,
      },
      Dialog: {
        props: ['open'],
        template: '<div class="mock-dialog-portal" v-if="open"><slot /></div>',
      },
      DialogContent: { template: '<div class="mock-dialog-content"><slot /></div>' },
      DialogHeader: { template: '<header><slot /></header>' },
      DialogTitle: { template: '<h3><slot /></h3>' },
      DialogDescription: { template: '<section><slot /></section>' },
      DialogFooter: { template: '<footer><slot /></footer>' },
      Button: { template: '<button class="mock-btn"><slot /></button>' },
      Select: { template: '<div class="mock-select"><slot /></div>' },
      SelectTrigger: { template: '<div><slot /></div>' },
      SelectValue: { template: '<div />' },
      SelectContent: { template: '<div />' },
      SelectGroup: { template: '<div />' },
    },
  },
}

describe('MoleculeThemeToggle', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders core container toggle layout structures correctly via custom test identifiers', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    expect(wrapper.find('[data-testid="molecule-theme-toggle"]').exists()).toBe(true)
  })

  it('receives structural props configuration layers accurately from story states', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps((DarkModeActive.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    expect(wrapper.props('isToggled')).toBe(true)
    expect(wrapper.props('currentTheme')).toBe('dark')
  })

  it('bubbles primary click toggle notifications upward when tap actions trigger', async () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const toggleButton = wrapper.find('.mock-atom-toggle')
    expect(toggleButton.exists()).toBe(true)

    await toggleButton.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('mounts modal theme lists and outputs open indicators after calling long-toggle triggers', async () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const toggleButton = wrapper.find('.mock-atom-toggle')
    expect(toggleButton.exists()).toBe(true)

    await toggleButton.trigger('contextmenu')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.mock-dialog-portal').exists()).toBe(true)
    expect(wrapper.emitted('longToggle')).toBeTruthy()
    expect(wrapper.text()).toContain('Choose more themes!')
  })

  it('changes computed icon layout outputs depending on current active theme flags', () => {
    const lightWrapper = mount(MoleculeThemeToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })
    const forestWrapper = mount(MoleculeThemeToggle, {
      props: getProps((CustomForestTheme.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    // Resolve structural lookup by extracting the real instance object reference via findComponent
    const lightToggleComponent = lightWrapper.findComponent({ name: 'AtomToggle' })
    const forestToggleComponent = forestWrapper.findComponent({ name: 'AtomToggle' })

    expect(lightToggleComponent.exists()).toBe(true)
    expect(forestToggleComponent.exists()).toBe(true)

    const lightIconObj = lightToggleComponent.props('icon')
    const forestIconObj = forestToggleComponent.props('icon')

    // Confirm that the memory references of the raw icon components are entirely different
    expect(lightIconObj).toBeDefined()
    expect(forestIconObj).toBeDefined()
    expect(lightIconObj).not.toEqual(forestIconObj)
  })
})
