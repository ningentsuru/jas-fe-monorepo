<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="organism-footer border-border bg-background mx-auto w-full border-t py-8"
    data-testid="organism-footer"
  >
    <div
      class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8"
    >
      <div class="flex flex-col items-start gap-1">
        <h2 class="text-foreground text-lg font-semibold" v-if="title">
          {{ title }}
        </h2>
        <p class="text-muted-foreground text-sm">&copy; {{ currentYear }} All rights reserved.</p>
      </div>

      <div class="flex items-center gap-4 text-sm">
        <slot />
      </div>
    </div>
    <span class="sr-only">organism-footer</span>
  </footer>
</template>
