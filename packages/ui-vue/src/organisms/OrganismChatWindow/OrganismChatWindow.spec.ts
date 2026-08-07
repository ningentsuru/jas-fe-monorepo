import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismChatWindow from './OrganismChatWindow.vue'
import meta, { EmptyOnboardingState, ActiveConversationState } from './OrganismChatWindow.stories'

type OrganismChatWindowProps = InstanceType<typeof OrganismChatWindow>['$props']

const getProps = (storyArgs: any): OrganismChatWindowProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as OrganismChatWindowProps
}

describe('OrganismChatWindow', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })

    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 500,
    })
  })

  it('renders onboarding splash headers and starter chips when messages array is empty', () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(EmptyOnboardingState.args),
    })

    expect(wrapper.text()).toContain("Chat with Joshua's AI Assistant")

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(6)
    expect(wrapper.text()).toContain("What is Joshua's primary tech stack?")
  })

  it('dispatches the correct choice payload up via select-starter emission hooks on chip clicks', async () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(EmptyOnboardingState.args),
    })

    const targetPromptButton = wrapper
      .findAll('button')
      .find((btn) => btn.text().includes('Nuxt 4'))
    expect(targetPromptButton?.exists()).toBe(true)

    await targetPromptButton?.trigger('click')

    expect(wrapper.emitted('select-starter')).toBeTruthy()
    expect(wrapper.emitted('select-starter')?.[0]).toEqual([
      'Tell me about his experience with Nuxt 4.',
    ])
  })

  it('hides starter prompt container matrices and mounts message bubble nodes when logs exist', () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(ActiveConversationState.args),
    })

    expect(wrapper.text()).not.toContain("Chat with Joshua's AI Assistant")
    expect(wrapper.text()).toContain('Tell me about your Nuxt experience.')
  })

  it('monitors and formats entire conversation lists accurately onto hardware clipboard arrays', async () => {
    const wrapper = mount(OrganismChatWindow, {
      props: getProps(ActiveConversationState.args),
    })

    const copyChatButton = wrapper
      .findAll('button')
      .find((btn) => btn.attributes('title')?.includes('Copy full'))
    expect(copyChatButton?.exists()).toBe(true)

    await copyChatButton?.trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('[You]\nTell me about your Nuxt experience.'),
    )
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("[Joshua's AI Assistant]\nJoshua has managed"),
    )
  })
})
