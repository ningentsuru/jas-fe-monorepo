<script setup lang="ts">
interface Props {
  title: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<template>
  <footer
    class="organism-footer border-border mx-auto w-full border-t"
    data-testid="organism-footer"
  >
    <div
      class="container mx-auto flex h-full flex-col items-start justify-between px-4 sm:px-6 lg:px-8"
    >
      <h1>{{ title }}</h1>
      <slot />
    </div>
    <span class="sr-only">organism-footer</span>
  </footer>
</template>
