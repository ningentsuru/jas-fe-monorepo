<script setup lang="ts">
defineProps<{ variant?: "primary" | "secondary" }>();
defineEmits<{ click: [] }>();
</script>

<template>
  <button
    class="px-4 py-2 rounded font-medium transition-colors cursor-pointer"
    :class="[
      variant === 'primary' ? 'bg-green-500 text-white hover:bg-green-600' : '',
      variant === 'secondary' ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
