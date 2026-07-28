import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomKeyboard from './AtomKeyboard.vue'
import meta, { Default } from './AtomKeyboard.stories'

type AtomKeyboardProps = InstanceType<typeof AtomKeyboard>['$props']

const getProps = (storyArgs: typeof Default.args): AtomKeyboardProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomKeyboardProps
}

describe('AtomKeyboard', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomKeyboard, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toContain('atom-keyboard')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AtomKeyboard, {
      props: getProps(Default.args),
    })


    // Verify character (string)
    expect(wrapper.props('character')).toEqual('')
  })
})
