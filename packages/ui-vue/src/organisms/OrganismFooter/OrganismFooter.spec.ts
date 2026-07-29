import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { OrganismFooter } from './OrganismFooter'
import meta, { Default, AlternativeTitle } from './OrganismFooter.stories'

type OrganismFooterProps = InstanceType<typeof OrganismFooter>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismFooterProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismFooterProps
}

describe('OrganismFooter', () => {
  it('renders root semantic layout structure and title text content properly', () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps(Default.args),
    })

    const currentYear = new Date().getFullYear().toString()

    expect(wrapper.find('[data-testid="organism-footer"]').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Core Design System Inc.')
    expect(wrapper.text()).toContain(currentYear)
    expect(wrapper.text()).toContain('All rights reserved.')
  })

  it('receives correct configuration title props from Storybook arguments mapping blocks', () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps(AlternativeTitle.args),
    })

    expect(wrapper.props('title')).toEqual('Monorepo Platform Footer Layer')
    expect(wrapper.find('h2').text()).toBe('Monorepo Platform Footer Layer')
  })

  it('renders child context template node slots smoothly inside the container layout layer', () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps(Default.args),
      slots: {
        default: () => h('span', { class: 'mock-nav' }, 'Footer Nav Elements'),
      },
    })

    const slottedEl = wrapper.find('.mock-nav')
    expect(slottedEl.exists()).toBe(true)
    expect(slottedEl.text()).toBe('Footer Nav Elements')
  })
})
