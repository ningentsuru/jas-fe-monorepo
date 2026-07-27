import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomInput from './AtomInput.vue'
import meta, { Default, ValidationError, CustomNumericSize } from './AtomInput.stories'

type AtomInputProps = InstanceType<typeof AtomInput>['$props']

const getProps = (storyArgs: typeof Default.args): AtomInputProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomInputProps
}

describe('AtomInput', () => {
  it('renders input elements and binds placeholders correctly', () => {
    const wrapper = mount(AtomInput, {
      props: getProps(Default.args),
    })

    const input = wrapper.find('[data-testid="atom-input"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Enter your credentials...')
  })

  it('updates reactive models accurately when strings are written', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps(Default.args),
    })

    const input = wrapper.find('input')
    await input.setValue('Testing value inputs')

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('Testing value inputs')
  })

  it('applies destructive border layout classes during validation errors', () => {
    const wrapper = mount(AtomInput, {
      props: getProps(ValidationError.args),
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.classes()).toContain('border-destructive')
  })

  it('computes inline style heights safely when a custom number is processed', () => {
    const wrapper = mount(AtomInput, {
      props: getProps(CustomNumericSize.args),
    })

    const input = wrapper.find('input')
    const element = input.element as HTMLElement

    expect(wrapper.props('size')).toBe(52)
    expect(input.classes()).toContain('h-[var(--input-size)]')
    expect(element.style.getPropertyValue('--input-size')).toBe('52px')
  })

  it('blocks pointer input updates when marked as disabled', () => {
    const wrapper = mount(AtomInput, {
      props: getProps({
        ...Default.args,
        disabled: true,
      }),
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.classes()).toContain('disabled:cursor-not-allowed')
  })

  it('renders injected side markup nodes through prefix and suffix template slots', () => {
    const wrapper = mount(AtomInput, {
      props: getProps(Default.args),
      slots: {
        prefix: '<span class="mock-prefix">Pre</span>',
        suffix: '<span class="mock-suffix">Suff</span>',
      },
    })

    expect(wrapper.find('.mock-prefix').text()).toBe('Pre')
    expect(wrapper.find('.mock-suffix').text()).toBe('Suff')
    expect(wrapper.find('input').classes()).toContain('pl-10')
    expect(wrapper.find('input').classes()).toContain('pr-10')
  })
})
