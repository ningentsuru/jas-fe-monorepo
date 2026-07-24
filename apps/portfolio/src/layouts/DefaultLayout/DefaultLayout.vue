<script setup lang="ts">
import { TemplateDefaultPortfolio, OrganismHeader, OrganismFooter, AtomToggle } from '@packages/ui'
import { Sun, Moon } from '@lucide/vue'

import { useAppTheme } from '@/composables/useAppTheme'

const { isDark, toggleTheme } = useAppTheme()
</script>

<template>
  <TemplateDefaultPortfolio class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader title="Your Nuxt Frontend Developer">
        <template #theme-toggle>
          <AtomToggle
            :icon="isDark ? Sun : Moon"
            :is-toggled="isDark"
            size="md"
            @toggle="toggleTheme"
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
      <OrganismFooter title="The end is near!">
        <div>Add component here</div>
      </OrganismFooter>
    </template>
  </TemplateDefaultPortfolio>
</template>
