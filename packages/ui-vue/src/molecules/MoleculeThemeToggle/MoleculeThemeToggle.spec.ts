import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeThemeToggle from './MoleculeThemeToggle.vue'
import { globalLongPressHandlers } from '../../setup'
import meta, { Default, DarkModeActive, CustomForestTheme } from './MoleculeThemeToggle.stories'

type MoleculeThemeToggleProps = InstanceType<typeof MoleculeThemeToggle>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeThemeToggleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeThemeToggleProps
}

describe('MoleculeThemeToggle', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
    document.body.innerHTML = ''
  })

  it('renders core container toggle layout structures correctly', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps(Default.args),
    })

    expect(wrapper.find('[data-testid="molecule-theme-toggle"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('molecule-theme-toggle')
  })

  it('receives correct structural props passed down from Storybook arguments', () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps(DarkModeActive.args),
    })

    expect(wrapper.props('isToggled')).toBe(true)
    expect(wrapper.props('currentTheme')).toBe('dark')
  })

  it('bubbles primary click toggle notifications upward when tap actions fire', async () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps(Default.args),
    })

    if (globalLongPressHandlers.onToggle) {
      globalLongPressHandlers.onToggle()
    }

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('mounts and displays modal theme lists after triggering long-toggle hooks', async () => {
    const wrapper = mount(MoleculeThemeToggle, {
      props: getProps(Default.args),
      attachTo: document.body,
    })

    if (globalLongPressHandlers.onLongToggle) {
      globalLongPressHandlers.onLongToggle()
    }

    await wrapper.vm.$nextTick()

    const modalElement = document.body.querySelector('[data-testid="molecule-modal"]')

    expect(modalElement).not.toBeNull()
    expect(wrapper.emitted('longToggle')).toBeTruthy()

    wrapper.unmount()
  })

  it('changes primary display icon layout choices dynamically depending on current active themes', async () => {
    const lightWrapper = mount(MoleculeThemeToggle, {
      props: getProps(Default.args),
    })
    const forestWrapper = mount(MoleculeThemeToggle, {
      props: getProps(CustomForestTheme.args),
    })

    const lightToggle = lightWrapper.findComponent({ name: 'AtomToggle' })
    const forestToggle = forestWrapper.findComponent({ name: 'AtomToggle' })

    expect(lightToggle.props('icon')).not.toEqual(forestToggle.props('icon'))
  })
})
