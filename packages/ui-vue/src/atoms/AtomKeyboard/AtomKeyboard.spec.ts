import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomKeyboard from './AtomKeyboard.vue'
import meta, { Default } from './AtomKeyboard.stories'

type AtomKeyboardProps = InstanceType<typeof AtomKeyboard>['$props']

const getProps = (storyArgs: typeof Default.args): AtomKeyboardProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomKeyboardProps
}

describe('AtomKeyboard', () => {
  it('renders properly using Storybook args', async () => {
    const wrapper = mount(AtomKeyboard, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="atom-keyboard"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('atom-keyboard')
  })

  it('receives and renders the correct character prop input into the canvas', async () => {
    const wrapper = mount(AtomKeyboard, {
      props: getProps({
        character: 'K',
      }),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('character')).toEqual('K')
    expect(wrapper.text()).toContain('K')
  })
})
