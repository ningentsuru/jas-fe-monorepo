import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref } from 'vue'

export const mockToggleTheme = vi.fn<() => void>()
export const mockSetTheme = vi.fn<(theme: string) => void>()
export const mockTheme = ref('auto')
export const mockIsDark = ref(false)

vi.mock('@/composables/useAppTheme', () => ({
  useAppTheme: () => ({
    isDark: mockIsDark,
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
    setTheme: mockSetTheme,
  }),
}))

export const mockRoute = {
  path: '/current-path',
  meta: {
    seo: {
      title: 'Mock Page Title',
      description: 'Mock SEO Description',
      type: 'website',
      schemaType: 'ProfilePage',
    },
  },
}

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
}))

vi.mock('@unhead/vue', () => ({
  useHead: vi.fn<() => void>(),
}))

config.global.stubs = {
  TemplateDefaultPortfolio: true,
  OrganismHeader: true,
  OrganismFooter: true,
  AtomToggle: true,
  Sun: true,
  Moon: true,
  RouterLink: true,
  AtomButton: true,
  AtomWordSwap: true,
  MoleculeThemeToggle: true,
}
