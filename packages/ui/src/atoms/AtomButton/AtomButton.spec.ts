import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomButton from './AtomButton.vue'
import { Default, Disabled, ExternalLink } from './AtomButton.stories'

describe('AtomButton', () => {
  it('renders default slot text and basic attributes properly', () => {
    const wrapper = mount(AtomButton, {
      props: Default.args,
      slots: {
        default: 'Hello Button',
      },
    })

    // Assert text content
    expect(wrapper.text()).toBe('Hello Button')
    // Assert target element node type
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    // Assert test id from component configuration
    expect(wrapper.attributes('data-testid')).toBe('atom-button')
  })

  it('receives and applies correct props from Storybook args', () => {
    const wrapper = mount(AtomButton, {
      props: {
        ...Default.args,
        size: 'lg',
        variant: 'primary',
      },
    })

    expect(wrapper.props('size')).toBe('lg')
    expect(wrapper.props('variant')).toBe('primary')
    expect(wrapper.classes()).toContain('px-6') // sizeClasses.lg check
    expect(wrapper.classes()).toContain('bg-primary') // variantClasses.primary check
  })

  it('handles polymorphic tag transformations for anchors', () => {
    const wrapper = mount(AtomButton, {
      props: ExternalLink.args,
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://google.com')
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('emits click event when active', async () => {
    const wrapper = mount(AtomButton, {
      props: Default.args,
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
  })

  it('prevents click events and applies accessibility properties when disabled', async () => {
    const wrapper = mount(AtomButton, {
      props: Disabled.args,
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
