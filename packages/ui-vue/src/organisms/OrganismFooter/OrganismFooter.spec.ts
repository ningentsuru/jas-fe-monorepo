import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismFooter from './OrganismFooter.vue'
import meta, { Default, Success } from './OrganismFooter.stories'

type OrganismFooterProps = InstanceType<typeof OrganismFooter>['$props']

const getProps = (storyArgs: Record<string, unknown>): OrganismFooterProps => {
  return { ...meta.args, ...storyArgs } as unknown as OrganismFooterProps
}

const globalMountOptions = {
  global: {
    stubs: {
      AtomSkeleton: { template: '<div class="mock-skeleton" />' },
      Button: {
        props: ['disabled'],
        template: '<button :disabled="disabled"><slot /></button>',
      },
    },
  },
}

describe('OrganismFooter', () => {
  it('renders the core contentinfo landmark container without crashing', () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    expect(wrapper.find('[data-testid="organism-footer"]').exists()).toBe(true)
    expect(wrapper.find('footer[role="contentinfo"]').exists()).toBe(true)
  })

  it('collects internal input data and emits a structured payload object on submission', async () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    const emailInput = wrapper.find('input[type="email"]')
    const messageTextarea = wrapper.find('textarea')

    await emailInput.setValue('developer@nuxt.com')
    await messageTextarea.setValue('Let us migrate to Nuxt 4 monorepos!')

    await wrapper.find('form').trigger('submit.prevent')

    // Confirm that the data payload object is cleanly passed to the parent event listener
    const submitEvents = wrapper.emitted('submit')
    expect(submitEvents).toBeTruthy()
    expect(submitEvents?.[0][0]).toEqual({
      email: 'developer@nuxt.com',
      message: 'Let us migrate to Nuxt 4 monorepos!',
    })
  })

  it('correctly executes exposed form clearing methods', async () => {
    const wrapper = mount(OrganismFooter, {
      props: getProps((Default.args ?? {}) as Record<string, unknown>),
      ...globalMountOptions,
    })

    await wrapper.find('input[type="email"]').setValue('clear-me@domain.com')

    // Explicitly run exposed layout interaction methods
    wrapper.vm.resetForm()
    await wrapper.vm.$nextTick()

    expect((wrapper.find('input[type="email"]').element as HTMLInputElement).value).toBe('')
  })
})
