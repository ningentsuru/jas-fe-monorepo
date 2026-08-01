import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from './DefaultLayout.vue'
import { mockToggleTheme, mockSetTheme } from '../../../vitest.setup'

describe('DefaultLayout.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders structural elements correctly using Storybook base setup', () => {
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: '<div>Workspace View Slot Content</div>',
      },
    })

    const layout = wrapper.find('[data-testid="default-layout"]')
    expect(layout.exists()).toBe(true)
    expect(wrapper.text()).toContain('Workspace View Slot Content')
  })

  it('triggers upstream theme state updates on subcomponent events', async () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          TemplateDefaultPortfolio: { template: '<div><slot name="header" /><slot /></div>' },
          OrganismHeader: { template: '<div><slot name="theme-toggle" /></div>' },
          MoleculeThemeToggle: {
            template: `
              <button id="toggle-btn" @click="$emit('toggle')">Toggle</button>
              <button id="set-btn" @click="$emit('set-theme', 'dark')">Set</button>
            `,
          },
        },
      },
    })

    await wrapper.find('#toggle-btn').trigger('click')
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)

    await wrapper.find('#set-btn').trigger('click')
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })
})
