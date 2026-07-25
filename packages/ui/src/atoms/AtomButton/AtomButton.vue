<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  variant: 'primary',
})

const emit = defineEmits(['click'])

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    class="atom-button inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      // Size Classes
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      // Variant Classes
      {
        'bg-primary focus:ring-primary text-primary-foreground hover:opacity-90':
          variant === 'primary',
        'focus:ring-primary border-border bg-card text-card-foreground hover:bg-muted border':
          variant === 'secondary',
        'focus:ring-primary hover:bg-muted text-foreground bg-transparent': variant === 'ghost',
        'text-primary focus:ring-primary bg-transparent hover:underline hover:opacity-80':
          variant === 'link',
        'bg-destructive focus:ring-destructive text-destructive-foreground hover:opacity-90':
          variant === 'destructive',
      },
    ]"
    :disabled="disabled"
    @click="handleClick"
    data-testid="atom-button"
  >
    <slot />
  </button>
</template>
