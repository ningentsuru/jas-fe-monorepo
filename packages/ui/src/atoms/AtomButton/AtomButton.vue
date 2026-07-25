<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
  to?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  variant: 'default',
  type: 'button',
})

const emit = defineEmits(['click'])

const isRouterLink = computed(() => !!props.to && !props.href)
const isNativeLink = computed(() => !!props.href)

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  if (!isNativeLink.value && !isRouterLink.value) {
    emit('click', event)
  }
}

function handleRouterNavigate(navigate: (e?: MouseEvent) => void, event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
  navigate(event)
}

const baseClasses =
  'atom-button inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses = {
  default: 'bg-transparent text-primary hover:opacity-80 focus:ring-primary',
  primary: 'bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary',
  secondary: 'border-border bg-card text-card-foreground hover:bg-muted focus:ring-primary border',
  ghost: 'bg-transparent text-foreground hover:bg-muted focus:ring-primary',
  link: 'bg-transparent text-primary hover:underline hover:opacity-80 focus:ring-primary',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90 focus:ring-destructive',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
</script>

<template>
  <router-link v-if="isRouterLink" :to="to" :target="target" custom v-slot="{ navigate, href }">
    <a
      :href="href"
      :target="target"
      :class="[baseClasses, sizeClasses[size], variantClasses[variant]]"
      @click="handleRouterNavigate(navigate, $event)"
      data-testid="atom-button"
    >
      <slot />
    </a>
  </router-link>

  <a
    v-else-if="isNativeLink"
    :href="href"
    :target="target"
    :class="[baseClasses, sizeClasses[size], variantClasses[variant]]"
    @click="handleClick"
    data-testid="atom-button"
  >
    <slot />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="[baseClasses, sizeClasses[size], variantClasses[variant]]"
    @click="handleClick"
    data-testid="atom-button"
  >
    <slot />
  </button>
</template>
