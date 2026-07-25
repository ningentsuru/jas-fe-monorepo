<script setup lang="ts">
import { ref } from 'vue'
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
  size?: 'sm' | 'md' | 'lg'
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

// Tracks the open/close state of the dropdown picker
const isOpen = ref<boolean>(false)

// Shared, stable state closure execution handler
function closeDropdown() {
  // A small timeout bypasses browser native choice click event races
  setTimeout(() => {
    isOpen.value = false
  }, 100)
}

function toggleDropdown(event: MouseEvent) {
  if (props.disabled) return

  // Checking pointer coordinates safely separates clicking the container
  // vs making an option selection from a native popover viewport.
  if (event.clientX > 0 && event.clientY > 0) {
    isOpen.value = !isOpen.value
  }
}

/**
 * Handle explicit keystroke indicators to sync state changes cleanly.
 */
function handleKeyDown(event: KeyboardEvent) {
  if (props.disabled) return

  if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
    isOpen.value = !isOpen.value
  } else if (event.key === 'Escape') {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="atom-select-container relative w-full">
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
      class="atom-select hc:border-2 border-border bg-card text-card-foreground focus:ring-ring focus:ring-offset-background block w-full cursor-pointer appearance-none rounded-md pr-10 shadow-sm transition-all outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2"
      :class="[
        // Error Styling Layer
        error
          ? 'border-destructive focus:border-destructive focus:ring-destructive/50'
          : 'hover:bg-muted/40',
        // Size Mapping Configurations
        {
          'h-9 py-1.5 pl-3 text-sm': size === 'sm',
          'h-11 py-2 pl-4 text-base': size === 'md',
          'h-14 py-3 pl-4 text-lg': size === 'lg',
        },
      ]"
    >
      <!-- Hidden Placeholder Node -->
      <option value="" disabled hidden class="bg-card text-card-foreground">
        {{ placeholder }}
      </option>

      <!-- Option Iterables Map Loop -->
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

    <!-- Custom Select Caret Indicators (No Style Tag Needed) -->
    <div
      class="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      aria-hidden="true"
    >
      <!-- Only one icon remains. It pivots smoothly using hardware-accelerated Tailwind transitions -->
      <AtomIcon
        :icon="ChevronRight"
        :size="size"
        class="transition-transform duration-200 ease-in-out"
        :class="isOpen ? 'rotate-90' : 'rotate-0'"
      />
    </div>
  </div>
</template>
