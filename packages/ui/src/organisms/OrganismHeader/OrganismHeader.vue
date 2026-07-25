<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { AtomToggle } from '../../'

interface Props {
  title: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const showMobileMenu = ref<boolean>(false)

function mobileMenuToggle() {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<template>
  <header
    class="organism-header border-foreground bg-background fixed mx-auto h-15 w-full border-b z-50"
    data-testid="organism-header"
  >
    <nav class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6">
      <RouterLink to="/">
        <h1>{{ title }}</h1>
      </RouterLink>
      <div class="flex gap-2 sm:gap-4">
        <div class="hidden gap-5 sm:flex">
          <RouterLink to="/his-cv"> His CV! </RouterLink>
        </div>
        <AtomToggle
          class="block sm:hidden"
          :icon="showMobileMenu ? X : Menu"
          :is-toggled="showMobileMenu"
          size="md"
          @toggle="mobileMenuToggle"
        />
        <slot name="theme-toggle" />
      </div>
    </nav>
    <span class="sr-only">organism-header</span>
  </header>
</template>
