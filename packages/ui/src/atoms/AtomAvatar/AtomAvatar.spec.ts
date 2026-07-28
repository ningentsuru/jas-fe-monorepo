import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomAvatar from './AtomAvatar.tsx'
import meta, { Default, Squared, CustomNumericSize } from './AtomAvatar.stories'

type AtomAvatarProps = InstanceType<typeof AtomAvatar>['$props']

const getProps = (storyArgs: typeof Default.args): AtomAvatarProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as AtomAvatarProps
}

describe('AtomAvatar', () => {
  it('renders matching initials properly from the username string data input', () => {
    const wrapper = mount(AtomAvatar, {
      props: getProps(Default.args),
    })

    expect(wrapper.text()).toBe('JO')
    expect(wrapper.attributes('data-testid')).toBe('atom-avatar')
  })

  it('renders a generic placeholder fallback for missing username states', () => {
    const wrapper = mount(AtomAvatar, {
      props: getProps({
        ...Default.args,
        username: '  ',
      }),
    })

    expect(wrapper.text()).toBe('??')
  })

  it('toggles border curvature styles correctly dynamically based on the round flag status', () => {
    const roundWrapper = mount(AtomAvatar, {
      props: getProps(Default.args),
    })
    const squareWrapper = mount(AtomAvatar, {
      props: getProps(Squared.args),
    })

    expect(roundWrapper.classes()).toContain('rounded-full')
    expect(squareWrapper.classes()).toContain('rounded-md')
  })

  it('safely registers layout size overrides via inline CSS variables when numbers are detected', () => {
    const wrapper = mount(AtomAvatar, {
      props: getProps(CustomNumericSize.args),
    })

    const domElement = wrapper.element as HTMLElement

    expect(wrapper.props('size')).toBe(75)
    expect(wrapper.classes()).toContain('h-[var(--avatar-size)]')
    expect(domElement.style.getPropertyValue('--avatar-size')).toBe('75px')
  })
})
