import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomInput from './AtomInput'
import meta, { Default, ErrorState, CustomNumericSize } from './AtomInput.stories'

type AtomInputProps = InstanceType<typeof AtomInput>['$props']

const getProps = (storyArgs: typeof Default.args): AtomInputProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomInputProps
}

describe('AtomInput', () => {
  it('binds and renders properties and value mutations correctly inside the document tree', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps({
        ...Default.args,
        modelValue: 'Monorepo Stack',
        placeholder: 'Search modules...',
      }),
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('[data-testid="atom-input"]')
    expect((input.element as HTMLInputElement).value).toBe('Monorepo Stack')
    expect(input.attributes('placeholder')).toBe('Search modules...')
  })

  it('bubbles text mutation data frames upward via standard update emitters', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('[data-testid="atom-input"]')
    await input.setValue('FSD Architecture')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['FSD Architecture'])
  })

  it('applies error structural color variables when active validation parameters catch blocks', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps(ErrorState.args),
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('[data-testid="atom-input"]')
    expect(input.classes()).toContain('border-destructive')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('renders side slot icon templates cleanly when containers are supplied', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps(Default.args),
      slots: {
        prefix: '<span class="mock-prefix">LINK</span>',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.mock-prefix').exists()).toBe(true)
    expect(wrapper.find('[data-testid="atom-input"]').classes()).toContain('pl-10')
  })

  it('injects style variables perfectly when explicit numerical sizing values match', async () => {
    const wrapper = mount(AtomInput, {
      props: getProps(CustomNumericSize.args),
    })

    await wrapper.vm.$nextTick()

    const input = wrapper.find('[data-testid="atom-input"]')
    const domElement = input.element as HTMLElement

    expect(input.classes()).toContain('h-[var(--input-size)]')
    expect(domElement.style.getPropertyValue('--input-size')).toBe('55px')
  })
})
