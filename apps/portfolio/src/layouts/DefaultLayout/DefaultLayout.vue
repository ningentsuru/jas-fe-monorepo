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
import { Sun, Moon } from '@lucide/vue'
import { useAppTheme } from '@/composables/useAppTheme'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const navItems = computed(() => [
  // { label: 'Download', children: [{ label: 'Resume', href: '/resume.pdf' }] },
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
            <h1 class="text-foreground hidden text-lg font-semibold sm:block">
              Your N<AtomWordSwap
                class="-mr-1 -ml-0.75"
                :words="['u', 'e']"
                :interval="2000"
                transition="slide-down"
              />xt Frontend Developer
            </h1>
            <h1 class="text-foreground block text-lg font-semibold sm:hidden">
              N<AtomWordSwap
                class="-mx-1"
                :words="['u', 'e']"
                :interval="2000"
                transition="scale-out"
              />xt Developer
            </h1>
          </AtomButton>
        </template>
        <template #theme-toggle>
          <MoleculeThemeToggle
            :icon="isDark ? Moon : Sun"
            :is-toggled="isDark"
            :current-theme="getTheme"
            @toggle="toggleTheme"
            @set-theme="setTheme($event)"
          />
        </template>
      </OrganismHeader>
    </template>
    <template #default>
      <main class="container px-4 pt-15 sm:px-6 lg:mx-auto">
        <slot />
        <span class="sr-only">default-layout</span>
      </main>
    </template>
    <template #footer>
      <OrganismFooter title="More information">
        <div>Add component here</div>
      </OrganismFooter>
    </template>
  </TemplateDefaultPortfolio>
</template>
