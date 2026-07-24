<script setup lang="ts">
interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Select an option',
  disabled: false,
  size: 'md',
  error: false,
})

const emit = defineEmits(['update:modelValue'])

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select
    data-testid="atom-select"
    :value="modelValue"
    @change="handleChange"
    :disabled="disabled"
    class="atom-select bg-card text-card-foreground border-input hover:bg-foreground/5 focus:border-ring block w-full rounded-md shadow-sm transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      // Error State Override
      error ? 'border-destructive focus:border-destructive focus:ring-destructive' : '',
      // Size Classes
      {
        'py-1.5 text-sm': size === 'sm',
        'py-2 text-base': size === 'md',
        'py-3 text-lg': size === 'lg',
      },
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
      class="bg-card text-card-foreground"
    >
      {{ option.label }}
    </option>
  </select>
</template>
