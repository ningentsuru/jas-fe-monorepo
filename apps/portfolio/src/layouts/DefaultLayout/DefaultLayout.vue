<script setup lang="ts">
import { computed } from 'vue'
import {
  TemplateDefaultPortfolio,
  OrganismHeader,
  OrganismFooter,
  MoleculeThemeToggle,
} from '@repo/ui'
import { Sun, Moon } from '@lucide/vue'
import { useAppTheme } from '@/composables/useAppTheme'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})
</script>

<template>
  <TemplateDefaultPortfolio class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader title="Your Nuxt Frontend Developer">
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
