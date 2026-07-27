<script setup lang="ts">
import type { Component } from 'vue'
import { AtomIcon } from '../../'
import { vLongPressToggle } from '../../directives/longPressToggle'

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
</script>

<template>
  <button
    type="button"
    class="atom-toggle focus:ring-ring focus:ring-offset-background flex cursor-pointer items-center"
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
