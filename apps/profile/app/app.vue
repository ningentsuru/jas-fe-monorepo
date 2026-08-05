<script setup lang="ts">
import { useAppTheme } from '@/composables/useAppTheme'

const { themeClass } = useAppTheme()
</script>

<template>
  <div
    :class="themeClass"
    class="bg-background text-foreground min-h-screen transition-colors duration-300"
  >
    <NuxtLayout />
  </div>
</template>
