<script setup lang="ts">
import type { Component } from 'vue'
import { AtomIcon } from '../../'
import { vLongPressToggle } from '../../directives/longPressToggle'
import { Button } from '#/components/ui/button'

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
  <Button
    type="button"
    variant="link"
    class="atom-toggle h-fit w-fit cursor-pointer rounded-full p-1 transition-all duration-300 select-none"
    :class="[
      isToggled
        ? 'bg-accent text-accent-foreground border-border'
        : 'text-muted-foreground hover:text-foreground border-transparent',
    ]"
    data-testid="atom-toggle"
    v-long-press-toggle="{
      delay: 200,
      onToggle: () => emit('toggle'),
      onLongToggle: () => emit('longToggle'),
    }"
  >
    <AtomIcon :icon="icon" :size="size" />
    <span class="sr-only">atom-toggle</span>
  </Button>
</template>
