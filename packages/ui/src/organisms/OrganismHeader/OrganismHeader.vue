<script setup lang="ts">
import { OrganismNavigation } from '../../'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

interface Props {
  navItems?: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <header class="border-border bg-card h-16 w-full border-b">
    <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
      <slot name="branding" />

      <div class="flex items-center justify-between gap-4">
        <OrganismNavigation :items="navItems ?? []" />

        <div class="border-border border-l pl-4">
          <slot name="theme-toggle" />
        </div>
      </div>
    </div>
  </header>
</template>
