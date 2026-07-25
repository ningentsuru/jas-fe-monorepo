<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { useLongPressToggle } from '../../composables/useLongPressToggle'

interface Props {
  icon: Component
  isToggled: boolean
  size: 'sm' | 'md' | 'lg' | 'xl' | number
}

const props = withDefaults(defineProps<Props>(), {
  isToggled: false,
  size: 'sm',
})

const emit = defineEmits(['toggle', 'longToggle'])

const buttonRef = ref<HTMLElement | null>(null)

useLongPressToggle(buttonRef, {
  delay: 200,
  onToggle: () => emit('toggle'),
  onLongToggle: () => emit('longToggle'),
})

const iconClass = computed(() => {
  if (typeof props.size === 'number') {
    return 'w-[var(--icon-size)] h-[var(--icon-size)]'
  }

  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'md':
      return 'w-6 h-6'
    case 'lg':
      return 'w-8 h-8'
    case 'xl':
      return 'w-12 h-12'
    default:
      return 'w-4 h-4'
  }
})

const iconStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--icon-size': `${props.size}px` } as any
  }
  return {}
})
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="atom-toggle cursor-pointer"
    data-testid="atom-toggle"
  >
    <component :is="icon" :class="iconClass" :style="iconStyle" />

    <span class="sr-only">atom-toggle</span>
  </button>
</template>
