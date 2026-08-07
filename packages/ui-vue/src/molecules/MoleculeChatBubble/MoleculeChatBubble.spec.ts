import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculeChatBubble from './MoleculeChatBubble.vue'
import meta, { UserMessage, AssistantMessage } from './MoleculeChatBubble.stories'

type MoleculeChatBubbleProps = InstanceType<typeof MoleculeChatBubble>['$props']

const getProps = (storyArgs: any): MoleculeChatBubbleProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as MoleculeChatBubbleProps
}

describe('MoleculeChatBubble', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('renders user messages properly matching storybook properties', () => {
    const wrapper = mount(MoleculeChatBubble, {
      props: getProps(UserMessage.args),
    })

    expect(wrapper.text()).toContain('You')
    expect(wrapper.text()).toContain('Hello! Can you summarize')

    expect(wrapper.props('message')).toEqual(UserMessage.args?.message)
  })

  it('compiles markdown chunks into sanitized HTML nodes safely for assistant logs', () => {
    const wrapper = mount(MoleculeChatBubble, {
      props: getProps(AssistantMessage.args),
    })

    expect(wrapper.text()).toContain("Joshua's AI Assistant")

    const strongTag = wrapper.find('strong')
    expect(strongTag.exists()).toBe(true)
    expect(strongTag.text()).toBe('Frontend Specialist')

    const anchorTag = wrapper.find('a')
    expect(anchorTag.exists()).toBe(true)
    expect(anchorTag.attributes('href')).toBe('mailto:ja.sardido@outlook.com')
  })

  it('triggers browser clipboard execution loops natively on copy action triggers', async () => {
    const wrapper = mount(MoleculeChatBubble, {
      props: getProps(UserMessage.args),
    })

    const copyButton = wrapper.find('button')
    expect(copyButton.exists()).toBe(true)

    await copyButton.trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "Hello! Can you summarize Joshua Sardido's expertise in Nuxt 4?",
    )
  })
})
