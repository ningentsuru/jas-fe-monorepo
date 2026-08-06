import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeSpamChallenge from './MoleculeSpamChallenge.vue'
import meta, { Default, ErrorState, SubmittingState } from './MoleculeSpamChallenge.stories'

type MoleculeSpamChallengeProps = InstanceType<typeof MoleculeSpamChallenge>['$props']

const getProps = (storyArgs: Record<string, unknown>): MoleculeSpamChallengeProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as MoleculeSpamChallengeProps
}

// Global stubs to flatten portals and make text assertions discoverable
const globalMountOptions = {
  global: {
    stubs: {
      Dialog: {
        props: ['open'],
        template: '<div class="mock-dialog" v-if="open"><slot /></div>',
      },
      DialogContent: { template: '<div class="mock-dialog-content"><slot /></div>' },
      DialogHeader: { template: '<header><slot /></header>' },
      DialogTitle: { template: '<h3><slot /></h3>' },
      DialogDescription: { template: '<p><slot /></p>' },
      DialogFooter: { template: '<footer><slot /></footer>' },
      Button: {
        props: ['variant', 'disabled'],
        template: '<button :disabled="disabled" class="mock-button"><slot /></button>',
      },
      InputOTP: {
        props: ['modelValue', 'disabled'],
        template: '<div class="mock-otp"><slot /></div>',
      },
      InputOTPGroup: { template: '<div><slot /></div>' },
      InputOTPSlot: {
        props: ['index'],
        template: '<span class="mock-otp-slot">Slot {{ index }}</span>',
      },
    },
  },
}

describe('MoleculeSpamChallenge', () => {
  it('renders nothing when open is set to false', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps({ open: false }),
      ...globalMountOptions,
    })

    expect(wrapper.find('.mock-dialog').exists()).toBe(false)
  })

  it('renders verification modal title and pads matching code outputs properly', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    expect(wrapper.find('.mock-dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('Anti-Spam Verification')

    // Ensure the 4-digit code '7423' is padded to 6 digits: '007423'
    expect(wrapper.text()).toContain('007423')
  })

  it('triggers local cancel event signatures when clicking cancellation targets', async () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const buttons = wrapper.findAll('.mock-button')
    const cancelButton = buttons.find((b) => b.text().includes('Cancel'))
    expect(cancelButton?.exists()).toBe(true)

    await cancelButton!.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('displays accurate alert details and error typography sequences', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps((ErrorState.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    expect(wrapper.text()).toContain('Code sequence mismatch!')
  })

  it('disables interactions and alters button text when submittal processing is active', () => {
    const wrapper = mount(MoleculeSpamChallenge, {
      props: getProps((SubmittingState.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const text = wrapper.text()
    expect(text).toContain('Sending...')
    expect(text).not.toContain('Verify & Send')

    const verifyBtn = wrapper.findAll('.mock-button').find((b) => b.text().includes('Sending...'))
    expect(verifyBtn?.attributes('disabled')).toBeDefined()
  })
})
