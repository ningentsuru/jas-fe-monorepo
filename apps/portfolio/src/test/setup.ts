import { config } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('@/composables/useAppTheme', () => ({
  useAppTheme: () => ({
    isDark: false,
    toggleTheme: vi.fn<() => void>(),
  }),
}))

config.global.stubs = {
  TemplateDefaultPortfolio: true,
  OrganismHeader: true,
  OrganismFooter: true,
  AtomToggle: true,
  Sun: true,
  Moon: true,
  RouterLink: true,
}
