import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from './AtomButton'
import meta, { Default, Disabled, ExternalLink } from './AtomButton.stories'

type AtomButtonProps = InstanceType<typeof AtomButton>['$props']

const getProps = (storyArgs: typeof Default.args): AtomButtonProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomButtonProps
}

describe('AtomButton', () => {
  it('renders child text slots correctly inside the component markup', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Default.args),
      slots: {
        default: 'Click Action',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="atom-button"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click Action')
  })

  it('applies standard sizing and modifier classes properly based on props', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const button = wrapper.find('[data-testid="atom-button"]')
    expect(button.classes()).toContain('h-10')
    expect(button.classes()).toContain('px-4')
  })

  it('handles polymorphic conversion to standard anchor elements if href is present', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(ExternalLink.args),
    })

    await wrapper.vm.$nextTick()

    const anchor = wrapper.find('a')
    expect(anchor.exists()).toBe(true)
    expect(anchor.attributes('href')).toBe('https://google.com')
    expect(anchor.attributes('target')).toBe('_blank')
  })

  it('blocks pointer triggers and updates accessibility properties when disabled', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Disabled.args),
    })

    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.attributes('aria-disabled')).toBe('true')

    await button.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('bubbles component click events upward when action triggers fire', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    await wrapper.find('[data-testid="atom-button"]').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
