import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeModal from './MoleculeModal.vue'
import meta, { Default, WithoutCloseButton } from './MoleculeModal.stories'

type MoleculeModalProps = InstanceType<typeof MoleculeModal>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeModalProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeModalProps
}

describe('MoleculeModal', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  it('renders modal markup architecture and slot layouts properly', () => {
    const wrapper = mount(MoleculeModal, {
      props: getProps(Default.args),
      slots: {
        default: '<div class="test-body">Main Data Context</div>',
      },
    })

    expect(wrapper.find('[data-testid="molecule-modal"]').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Account Settings Override')
    expect(wrapper.find('.test-body').text()).toBe('Main Data Context')
  })

  it('executes showModal mechanisms and blocks parent view overflows when visible', async () => {
    const showSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')

    mount(MoleculeModal, {
      props: getProps(Default.args),
    })

    await vi.dynamicImportSettled()

    expect(showSpy).toHaveBeenCalled()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('executes close mechanisms and restores standard layout behaviors when show changes to false', async () => {
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')

    const wrapper = mount(MoleculeModal, {
      props: getProps(Default.args),
    })

    const dialogEl = wrapper.find('dialog').element as HTMLDialogElement
    Object.defineProperty(dialogEl, 'open', { value: true, writable: true })

    await wrapper.setProps({ show: false })
    await vi.dynamicImportSettled()

    expect(closeSpy).toHaveBeenCalled()
    expect(document.body.style.overflow).toBe('')
  })

  it('hides the topaction dismissal controller when specified by properties', () => {
    const wrapper = mount(MoleculeModal, {
      props: getProps(WithoutCloseButton.args),
    })

    expect(wrapper.find('button[aria-label="Close modal"]').exists()).toBe(false)
  })

  it('bubbles close event triggers when interacting with target header targets', async () => {
    const wrapper = mount(MoleculeModal, {
      props: getProps(Default.args),
    })

    const dismissButton = wrapper.find('button[aria-label="Close modal"]')
    await dismissButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('prevents native cancel responses and safely maps escape inputs to framework triggers', async () => {
    const wrapper = mount(MoleculeModal, {
      props: getProps(Default.args),
    })

    const dialog = wrapper.find('dialog')

    await dialog.trigger('cancel')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renders complex injected template structures inside the structural footer slot area', () => {
    const wrapper = mount(MoleculeModal, {
      props: getProps(Default.args),
      slots: {
        footer: '<div class="custom-footer">Aligned Actions</div>',
      },
    })

    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').text()).toBe('Aligned Actions')
  })
})
