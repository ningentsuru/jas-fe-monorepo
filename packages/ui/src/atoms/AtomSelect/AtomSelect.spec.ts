import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomSelect from './AtomSelect.vue'
import meta, { Default, ValidationError, CustomNumericSize } from './AtomSelect.stories'

type AtomSelectProps = InstanceType<typeof AtomSelect>['$props']

const getProps = (storyArgs: typeof Default.args): AtomSelectProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomSelectProps
}

describe('AtomSelect', () => {
  it('renders dropdown placeholder and select parameters correctly', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps(Default.args),
    })

    const selectEl = wrapper.find('[data-testid="atom-select"]')
    expect(selectEl.exists()).toBe(true)
    expect(wrapper.text()).toContain('Choose your tech stack')
  })

  it('renders the complete iterable option mapping array list accurately', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps(Default.args),
    })

    const options = wrapper.findAll('option')
    expect(options.length).toBe(5)
    expect(options[1].text()).toBe('Vue.js Framework')
    expect(options[3].attributes('disabled')).toBeDefined()
  })

  it('binds the initial input values correctly onto the selection node', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps({
        ...Default.args,
        modelValue: 'react',
      }),
    })

    const select = wrapper.find('select').element as HTMLSelectElement
    expect(select.value).toBe('react')
  })

  it('injects structural styling attributes when flagged with validation errors', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps(ValidationError.args),
    })

    const selectEl = wrapper.find('select')
    expect(selectEl.attributes('aria-invalid')).toBe('true')
    expect(selectEl.classes()).toContain('border-destructive')
  })

  it('handles downstream custom variable heights when primitive sizing numbers are provided', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps(CustomNumericSize.args),
    })

    const selectEl = wrapper.find('select')
    const element = selectEl.element as HTMLElement

    expect(wrapper.props('size')).toBe(58)
    expect(selectEl.classes()).toContain('h-[var(--select-size)]')
    expect(element.style.getPropertyValue('--select-size')).toBe('58px')
  })

  it('disables interactions dynamically when specified by parameter states', () => {
    const wrapper = mount(AtomSelect, {
      props: getProps({
        ...Default.args,
        disabled: true,
      }),
    })

    const selectEl = wrapper.find('select')
    expect(selectEl.attributes('disabled')).toBeDefined()
    expect(selectEl.classes()).toContain('disabled:cursor-not-allowed')
  })
})
