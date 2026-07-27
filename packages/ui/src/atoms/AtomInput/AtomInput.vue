<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  id?: string
  name?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  error: false,
  size: 'md',
  id: undefined,
  name: undefined,
  type: 'text',
  ariaLabel: undefined,
})

const modelValue = defineModel<string | number>({ default: '' })

const inputClass = computed(() => {
  if (typeof props.size === 'number') {
    return 'px-4 text-base h-[var(--input-size)]'
  }

  const sizeClasses: Record<string, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-base',
    lg: 'h-14 px-4 text-lg',
    xl: 'h-16 px-5 text-xl',
  }

  return sizeClasses[props.size] || sizeClasses.md
})

const inputStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--input-size': `${props.size}px` }
  }
  return {}
})
</script>

<template>
  <div class="atom-input-container font-display relative flex w-full items-center">
    <!-- Prefix Slot Layer -->
    <div
      v-if="$slots.prefix"
      class="text-muted-foreground pointer-events-none absolute left-3 flex items-center"
    >
      <slot name="prefix" />
    </div>

    <input
      :id="props.id"
      :name="props.name"
      :type="props.type"
      data-testid="atom-input"
      v-model="modelValue"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-label="props.ariaLabel"
      :style="inputStyle"
      class="atom-input border-border bg-card text-card-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring focus-visible:ring-offset-background hc:border-2 block w-full rounded-md border shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2"
      :class="[
        inputClass,
        error
          ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'
          : 'hover:bg-muted/20',
        $slots.prefix ? 'pl-10' : '',
        $slots.suffix ? 'pr-10' : '',
      ]"
    />

    <!-- Suffix Slot Layer -->
    <div
      v-if="$slots.suffix"
      class="text-muted-foreground pointer-events-none absolute right-3 flex items-center"
    >
      <slot name="suffix" />
    </div>
  </div>
</template>
