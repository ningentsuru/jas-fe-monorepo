<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'

const layoutMap = {
  web: DefaultLayout,
} as const

const route = useRoute()

const currentLayout = computed(() => {
  const layoutKey = (route.meta.layout as keyof typeof layoutMap) || 'web'
  return layoutMap[layoutKey] || DefaultLayout
})
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
