import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomNavLink from './AtomNavLink'
import AtomButton from '../AtomButton/AtomButton'
import meta, {
  Default,
  ActiveLink,
  CustomNumericSize,
  RouterLinkVariant,
} from './AtomNavLink.stories'

type AtomNavLinkProps = InstanceType<typeof AtomNavLink>['$props']

const getProps = (storyArgs: typeof Default.args): AtomNavLinkProps => {
  return {
    ...meta.args,
    ...storyArgs,
  } as unknown as AtomNavLinkProps
}

describe('AtomNavLink', () => {
  it('renders label text contents correctly', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Dashboard Overview')
    expect(wrapper.props('label')).toBe('Dashboard Overview')
  })

  it('applies text-primary styling only when marked as active', async () => {
    const defaultWrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })
    const activeWrapper = mount(AtomNavLink, {
      props: getProps(ActiveLink.args),
    })

    await Promise.all([defaultWrapper.vm.$nextTick(), activeWrapper.vm.$nextTick()])

    const defButton = defaultWrapper.findComponent(AtomButton)
    const actButton = activeWrapper.findComponent(AtomButton)

    expect(defButton.classes()).toContain('text-foreground')
    expect(actButton.classes()).toContain('text-primary')
  })

  it('safely pipes downstream custom numeric sizes to internal button mechanisms', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(CustomNumericSize.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('size')).toBe(52)
  })

  it('passes routing properties directly down to the core layout layers', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(RouterLinkVariant.args),
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.props('to')).toBe('/settings')
  })

  it('renders injected markup content via the named trailing slot structure', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
      slots: {
        trailing: '<span class="badge-mock">Icon</span>',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.badge-mock').exists()).toBe(true)
    expect(wrapper.find('.badge-mock').text()).toBe('Icon')
  })

  it('bubbles inner click triggers upward seamlessly', async () => {
    const wrapper = mount(AtomNavLink, {
      props: getProps(Default.args),
    })

    await wrapper.vm.$nextTick()

    await wrapper.findComponent(AtomButton).trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
