import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomToggle from './AtomToggle.vue'
import { vLongPressToggle } from '../../directives/vLongPressOptions'
import meta, { Default } from './AtomToggle.stories'

type AtomToggleProps = InstanceType<typeof AtomToggle>['$props']

const getProps = (storyArgs: Record<string, unknown>): AtomToggleProps => {
  return { ...meta.args, ...storyArgs } as unknown as AtomToggleProps
}

const globalMountOptions = {
  global: {
    directives: { 'long-press-toggle': vLongPressToggle },
    stubs: { AtomIcon: true },
  },
}

describe('AtomToggle Accessibility and Interaction Integration', () => {
  it('supplies descriptive title attribute info strings for visual mouse hoverings', () => {
    const wrapper = mount(AtomToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const button = wrapper.find('button')
    expect(button.attributes('title')).toContain('Toggle layout theme configuration options')
  })

  it('triggers alternative menu selection states on native right-click/contextmenu actions', async () => {
    const wrapper = mount(AtomToggle, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.find('button').trigger('contextmenu')
    expect(wrapper.emitted('longToggle')).toBeTruthy()
  })
})
