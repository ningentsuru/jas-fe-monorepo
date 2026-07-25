<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import { AtomIcon } from '../../'
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
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="atom-toggle flex cursor-pointer items-center"
    data-testid="atom-toggle"
  >
    <AtomIcon :icon="icon" :size="size" />
    <span class="sr-only">atom-toggle</span>
  </button>
</template>
