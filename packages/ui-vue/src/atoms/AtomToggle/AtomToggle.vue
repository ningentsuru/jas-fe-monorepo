<script setup lang="ts">
import type { Component } from 'vue'
import { AtomIcon } from '../../'
import { vLongPressToggle } from '../../directives/longPressToggle'

interface Props {
  icon: Component
  isToggled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
}

const props = withDefaults(defineProps<Props>(), {
  isToggled: false,
  size: 'sm',
})

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'longToggle'): void
}>()
</script>

<template>
  <button
    type="button"
    class="atom-toggle focus-visible:ring-ring focus-visible:ring-offset-background flex cursor-pointer items-center justify-center rounded-md border border-transparent transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    data-testid="atom-toggle"
    v-long-press-toggle="{
      delay: 200,
      onToggle: () => emit('toggle'),
      onLongToggle: () => emit('longToggle'),
    }"
  >
    <AtomIcon :icon="icon" :size="size" />
    <span class="sr-only">atom-toggle</span>
  </button>
</template>
