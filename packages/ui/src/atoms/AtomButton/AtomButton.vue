<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
  to?: string | Record<string, any>
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  variant: 'default',
  type: 'button',
  to: undefined,
  href: undefined,
  target: undefined,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Captures additional dynamic wrapper attributes (classes, testids, styles, etc.)
const attrs = useAttrs()

// Computes the correct HTML node to mount inside the virtual rendering engine
const componentTag = computed(() => {
  if (props.disabled) return 'button' // Force a standard accessible button tag if disabled
  if (props.to) return 'router-link' as unknown as string | Component
  if (props.href) return 'a'
  return 'button'
})

// Correct attributes configuration mapping to prevent DOM attribute pollution
const componentProps = computed(() => {
  if (props.disabled) return { type: props.type, disabled: true }
  if (props.to) return { to: props.to, target: props.target }
  if (props.href) return { href: props.href, target: props.target }
  return { type: props.type }
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

// Clean functional utility configuration string mappings
const baseClasses =
  'atom-button inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none'

const variantClasses = {
  default: 'bg-transparent text-primary hover:opacity-80 focus:ring-ring',
  primary: 'bg-primary text-primary-foreground hover:opacity-90 focus:ring-ring',
  secondary: 'border border-border bg-card text-card-foreground hover:bg-muted focus:ring-ring',
  ghost: 'bg-transparent text-foreground hover:bg-muted focus:ring-ring',
  link: 'bg-transparent text-primary hover:underline hover:opacity-80 focus:ring-ring p-0! h-auto',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90 focus:ring-destructive',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm h-8',
  md: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
}
</script>

<template>
  <component
    :is="componentTag"
    v-bind="{ ...componentProps, ...attrs }"
    data-testid="atom-button"
    :class="[
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      'focus:ring-offset-background',
      'hc:border-2 data-[theme=high-contrast]:border-2',
    ]"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
