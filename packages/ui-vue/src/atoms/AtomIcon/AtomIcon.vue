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

const iconClass = computed(() => {
  const baseClasses = 'text-[var(--color-foreground)] transition-colors'

  if (typeof props.size === 'number') {
    return `${baseClasses} w-[var(--icon-size)] h-[var(--icon-size)]`
  }

  const sizeMap: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const resolvedSize = typeof props.size === 'string' ? props.size : 'md'
  return `${baseClasses} ${sizeMap[resolvedSize as keyof typeof sizeMap] || sizeMap.md}`
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
    <img
      v-if="typeof icon === 'string'"
      :src="icon"
      :class="iconClass"
      :alt="name || 'icon'"
      draggable="false"
    />

    <component v-else-if="icon" :is="icon" :class="iconClass" />

    <span v-else-if="name" class="text-sm font-medium tracking-wide">
      {{ name }}
    </span>

    <span class="sr-only">atom-icon</span>
  </div>
</template>
