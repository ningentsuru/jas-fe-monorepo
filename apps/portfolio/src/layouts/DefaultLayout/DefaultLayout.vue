<script setup lang="ts">
import { computed } from 'vue'
import {
  TemplateDefaultPortfolio,
  OrganismHeader,
  OrganismFooter,
  MoleculeThemeToggle,
  AtomWordSwap,
  AtomButton,
} from '@repo/ui-vue'
import { useAppTheme } from '@/composables/useAppTheme'
import { NAVIGATIONS } from '@/constants'
import type { Themes, NavItem } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const navItems = NAVIGATIONS as unknown as NavItem[]

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
            @set-theme="setTheme($event as Themes)"
          />
        </template>
      </OrganismHeader>
    </template>

    <template #default>
      <Suspense>
        <template #default>
          <main class="container mx-auto flex h-full min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
            <slot />
            <span class="sr-only">default-layout</span>
          </main>
        </template>
        <template #fallback>
          <main class="flex h-screen w-screen items-center justify-center">Loading data...</main>
        </template>
      </Suspense>
    </template>

    <template #footer>
      <OrganismFooter title="This is footer">
        <div>Note: By holding the theme toggle you can choose different themes.</div>
        <div>Todo: Add contact me component here.</div>
      </OrganismFooter>
    </template>
  </TemplateDefaultPortfolio>
</template>
