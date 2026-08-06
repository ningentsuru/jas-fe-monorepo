<script setup lang="ts">
import type { Component } from 'vue'
import { AtomIcon } from '#/index'
import { vLongPressToggle } from '#/directives/vLongPressOptions'
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

function handleContextMenu(event: Event) {
  event.preventDefault() // Block default browser right-click layout popups
  emit('longToggle') // Backfills long press actions for screen-readers instantly
}
</script>

<template>
  <Button
    type="button"
    variant="link"
    class="atom-toggle focus-visible:ring-ring h-fit w-fit cursor-pointer rounded-full p-1 transition-all duration-300 select-none focus-visible:ring-2 focus-visible:outline-none"
    :class="[
      isToggled
        ? 'bg-accent text-accent-foreground border-border'
        : 'text-muted-foreground hover:text-foreground border-transparent',
    ]"
    data-testid="atom-toggle"
    aria-haspopup="dialog"
    title="Toggle layout theme configuration options (Right-click or hold to view advanced skins)"
    v-long-press-toggle="{
      delay: 200,
      onToggle: () => emit('toggle'),
      onLongToggle: () => emit('longToggle'),
    }"
    @contextmenu="handleContextMenu"
  >
    <AtomIcon :icon="icon" :size="size" aria-hidden="true" />

    <span class="sr-only">
      Toggle theme variant. Right-click, press shift F10, or hold down to reveal advanced skin
      customization options.
    </span>
  </Button>
</template>
