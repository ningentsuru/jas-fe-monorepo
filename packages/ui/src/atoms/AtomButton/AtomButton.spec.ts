import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from './AtomButton.vue'
import meta, { Default, Disabled, ExternalLink } from './AtomButton.stories'

type AtomButtonProps = InstanceType<typeof AtomButton>['$props']

const getProps = (storyArgs: typeof Default.args): AtomButtonProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomButtonProps
}

describe('AtomButton', () => {
  it('renders default slot text and basic attributes properly', () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Default.args),
      slots: {
        default: 'Hello Button',
      },
    })

    expect(wrapper.text()).toBe('Hello Button')
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    expect(wrapper.attributes('data-testid')).toBe('atom-button')
  })

  it('receives and applies correct props from Storybook args', () => {
    const wrapper = mount(AtomButton, {
      props: getProps({
        ...Default.args,
        size: 'lg',
        variant: 'primary',
      }),
    })

    expect(wrapper.props('size')).toBe('lg')
    expect(wrapper.props('variant')).toBe('primary')
    expect(wrapper.classes()).toContain('px-6')
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies classes correctly for the new xl size value', () => {
    const wrapper = mount(AtomButton, {
      props: getProps({
        ...Default.args,
        size: 'xl',
      }),
    })

    expect(wrapper.props('size')).toBe('xl')
    expect(wrapper.classes()).toContain('h-16')
    expect(wrapper.classes()).toContain('px-8')
  })

  it('applies custom inline styles and variable sizing when a number is passed', () => {
    const wrapper = mount(AtomButton, {
      props: getProps({
        ...Default.args,
        size: 55,
      }),
    })

    const element = wrapper.element as HTMLElement

    expect(wrapper.props('size')).toBe(55)
    expect(wrapper.classes()).toContain('h-[var(--button-size)]')
    expect(element.style.getPropertyValue('--button-size')).toBe('55px')
  })

  it('handles polymorphic tag transformations for anchors', () => {
    const wrapper = mount(AtomButton, {
      props: getProps(ExternalLink.args),
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://google.com')
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('emits click event when active', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Default.args),
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('prevents click events and applies accessibility properties when disabled', async () => {
    const wrapper = mount(AtomButton, {
      props: getProps(Disabled.args),
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
