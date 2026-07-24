<script setup lang="ts">
import { Sun, Moon } from '@lucide/vue'

interface Props {
  isDark: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isDark: false,
})
</script>

<template>
  <button class="atom-theme-toggle" data-testid="atom-theme-toggle">
    <Sun v-if="props.isDark" />
    <Moon v-else />
    <span class="sr-only">atom-theme-toggle</span>
  </button>
</template>
