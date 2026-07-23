<script setup lang="ts">
import { shallowRef } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout'

const layoutMap = {
  web: DefaultLayout,
} as const

const getLayoutKey = (): keyof typeof layoutMap => {
  return 'web'
}

const currentLayout = shallowRef(layoutMap[getLayoutKey()] || DefaultLayout)
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
