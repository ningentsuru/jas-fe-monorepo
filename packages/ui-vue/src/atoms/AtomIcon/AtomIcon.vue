<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  name?: string
  icon?: Component
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 'md',
})

const iconClass = computed(() => {
  const baseClasses = 'text-[var(--color-foreground)] transition-colors'
  const customSizeClass = props.class || ''

  if (typeof props.size === 'number') {
    return `${baseClasses} w-[var(--icon-size)] h-[var(--icon-size)] ${customSizeClass}`
  }

  const sizeMap: Record<string, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return `${baseClasses} ${sizeMap[props.size] || sizeMap.md} ${customSizeClass}`
})

const iconStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--icon-size': `${props.size}px` }
  }
  return {}
})
</script>

<template>
  <div
    class="atom-icon inline-flex items-center justify-center"
    data-testid="atom-icon"
    :style="iconStyle"
  >
    <component v-if="icon" :is="icon" :class="iconClass" />

    <span v-if="!icon && name" class="text-sm">
      {{ name }}
    </span>

    <span class="sr-only">atom-icon</span>
  </div>
</template>
