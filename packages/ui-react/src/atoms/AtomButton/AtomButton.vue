<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
  to?: string | Record<string, unknown>
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

const attrs = useAttrs()

const componentTag = computed(() => {
  if (props.disabled) return 'button'
  if (props.to) return 'router-link' as unknown as string | Component
  if (props.href) return 'a'
  return 'button'
})

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

const baseClasses =
  'atom-button inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none'

const variantClasses = {
  default: 'bg-transparent text-primary hover:opacity-80 focus-visible:ring-ring',
  primary: 'bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-ring',
  secondary:
    'border border-border bg-card text-card-foreground hover:bg-muted focus-visible:ring-ring',
  ghost: 'bg-transparent text-foreground hover:bg-muted focus-visible:ring-ring',
  link: 'bg-transparent text-primary hover:underline hover:opacity-80 focus-visible:ring-ring p-0! h-auto',
  destructive:
    'bg-destructive text-destructive-foreground hover:opacity-90 focus-visible:ring-destructive',
}

const buttonClass = computed(() => {
  if (typeof props.size === 'number') {
    return 'px-4 py-2 text-base h-[var(--button-size)]'
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12',
    xl: 'px-8 py-4 text-xl h-16',
  }

  return sizeClasses[props.size] || sizeClasses.md
})

const buttonStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--button-size': `${props.size}px` }
  }
  return {}
})
</script>

<template>
  <component
    :is="componentTag"
    v-bind="{ ...componentProps, ...attrs }"
    data-testid="atom-button"
    :class="[
      baseClasses,
      buttonClass,
      variantClasses[variant],
      'focus-visible:ring-offset-background',
      'hc:border-2 data-[theme=high-contrast]:border-2',
    ]"
    :style="buttonStyle"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
