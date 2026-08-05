<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  name?: string
  icon?: Component | string
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 'md',
})

const sizeMap: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-12',
}

const iconClass = computed(() => {
  if (typeof props.size === 'number') {
    return 'transition-colors duration-200'
  }
  return `transition-colors duration-200 ${sizeMap[props.size] || sizeMap.md}`
})

const iconStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
    }
  }
  return {}
})
</script>

<template>
  <div
    class="atom-icon text-foreground inline-flex shrink-0 items-center justify-center"
    data-testid="atom-icon"
  >
    <img
      v-if="typeof icon === 'string'"
      :src="icon"
      :class="iconClass"
      :style="iconStyle"
      :alt="name || 'icon'"
      draggable="false"
    />

    <component v-else-if="icon" :is="icon" :class="iconClass" :style="iconStyle" />

    <span v-else-if="name" class="text-sm font-medium tracking-wide">
      {{ name }}
    </span>

    <span class="sr-only">atom-icon</span>
  </div>
</template>
