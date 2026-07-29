<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronRight } from '@lucide/vue'
import { AtomIcon } from '../../'

interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  options: Option[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  error?: boolean
  id?: string
  name?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: 'Select an option',
  disabled: false,
  size: 'md',
  error: false,
  id: undefined,
  name: undefined,
  ariaLabel: undefined,
})

const modelValue = defineModel<string | number>({ default: '' })

const isOpen = ref<boolean>(false)

function closeDropdown() {
  setTimeout(() => {
    isOpen.value = false
  }, 100)
}

function toggleDropdown(event: MouseEvent) {
  if (props.disabled) return

  if (event.clientX > 0 && event.clientY > 0) {
    isOpen.value = !isOpen.value
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (props.disabled) return

  if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
    isOpen.value = !isOpen.value
  } else if (event.key === 'Escape') {
    isOpen.value = false
  }
}

const selectClass = computed(() => {
  if (typeof props.size === 'number') {
    return 'pl-4 text-base h-[var(--select-size)]'
  }

  const sizeClasses: Record<string, string> = {
    sm: 'h-9 py-1.5 pl-3 text-sm',
    md: 'h-11 py-2 pl-4 text-base',
    lg: 'h-14 py-3 pl-4 text-lg',
    xl: 'h-16 py-4 pl-4 text-xl',
  }

  return sizeClasses[props.size] || sizeClasses.md
})

const selectStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--select-size': `${props.size}px` }
  }
  return {}
})
</script>

<template>
  <div class="atom-select-container font-display relative w-full">
    <select
      :id="props.id"
      :name="props.name"
      data-testid="atom-select"
      v-model="modelValue"
      :disabled="props.disabled"
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-label="props.ariaLabel"
      @mousedown="toggleDropdown"
      @blur="closeDropdown"
      @change="closeDropdown"
      @keydown="handleKeyDown"
      :style="selectStyle"
      class="atom-select border-border bg-card text-card-foreground focus-visible:ring-ring focus-visible:ring-offset-background hc:border-2 block w-full cursor-pointer appearance-none rounded-md border pr-10 shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2"
      :class="[
        selectClass,
        error
          ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'
          : 'hover:bg-muted/40',
      ]"
    >
      <option value="" disabled hidden class="bg-card text-card-foreground">
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        class="checked:bg-primary checked:text-primary-foreground bg-card text-card-foreground"
      >
        {{ option.label }}
      </option>
    </select>

    <div
      class="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      aria-hidden="true"
    >
      <AtomIcon
        :icon="ChevronRight"
        :size="size"
        class="transition-transform duration-200 ease-in-out"
        :class="isOpen ? 'rotate-90' : 'rotate-0'"
      />
    </div>
  </div>
</template>
