import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismChatWindow from './OrganismChatWindow.vue'
import meta, { Default } from './OrganismChatWindow.stories'

type OrganismChatWindowProps = InstanceType<typeof OrganismChatWindow>['$props']

const getProps = (storyArgs: typeof Default.args): OrganismChatWindowProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismChatWindowProps
}

describe('OrganismChatWindow', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('organism-chat-window')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(Default.args),
    })


    // Verify string (string)
    expect(wrapper.props('string')).toEqual('')
    // Verify number (number)
    expect(wrapper.props('number')).toEqual(0)
    // Verify boolean (boolean)
    expect(wrapper.props('boolean')).toEqual(false)
  })
})
