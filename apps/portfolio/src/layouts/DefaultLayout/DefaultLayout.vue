<script setup lang="ts">
import { computed } from 'vue'
import {
  TemplateDefaultPortfolio,
  OrganismHeader,
  OrganismFooter,
  MoleculeThemeToggle,
  AtomWordSwap,
  AtomButton,
} from '@repo/ui'
import { useAppTheme } from '@/composables/useAppTheme'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const navItems = computed(() => [
  {
    label: 'About',
    children: [
      { label: 'Me', href: '/about-me' },
      { label: 'This Monorepo', href: '/about-this-monorepo' },
    ],
  },
  { label: 'Job Search', href: '/job-search' },
  { label: 'His CV', href: '/his-cv' },
])

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})
</script>

<template>
  <TemplateDefaultPortfolio class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader :nav-items="navItems">
        <template #branding>
          <AtomButton class="shrink-0 p-0!" to="/">
            <h1 class="text-foreground flex items-center justify-center text-lg font-semibold">
              <span class="hidden sm:inline">Your N</span>
              <span class="sm:hidden">N</span>
              <AtomWordSwap
                :words="['u', 'e']"
                :interval="2000"
                transition="slide-down"
                class="-mx-1"
              />
              <span class="hidden sm:inline">xt Frontend Developer</span>
              <span class="sm:hidden">xt Developer</span>
            </h1>
          </AtomButton>
        </template>
        <template #theme-toggle>
          <MoleculeThemeToggle
            :is-toggled="isDark"
            :current-theme="getTheme"
            @toggle="toggleTheme"
            @set-theme="setTheme($event)"
          />
        </template>
      </OrganismHeader>
    </template>
    <template #default>
      <main class="container mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
        <span class="sr-only">default-layout</span>
      </main>
    </template>
    <template #footer>
      <OrganismFooter title="This is footer">
        <div>Note: By holding the theme toggle you can choose different themes.</div>
        <div>Todo: Add contact me component here.</div>
      </OrganismFooter>
    </template>
  </TemplateDefaultPortfolio>
</template>
