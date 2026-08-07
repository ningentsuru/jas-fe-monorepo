import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeChatBubble from './MoleculeChatBubble.vue'
import meta, { Default } from './MoleculeChatBubble.stories'

type MoleculeChatBubbleProps = InstanceType<typeof MoleculeChatBubble>['$props']

const getProps = (storyArgs: typeof Default.args): MoleculeChatBubbleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeChatBubbleProps
}

describe('MoleculeChatBubble', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MoleculeChatBubble, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('molecule-chat-bubble')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(MoleculeChatBubble, {
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
