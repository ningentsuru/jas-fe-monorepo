<script setup lang="ts">
interface Props {
  title: string
  count: number
  size: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  count: 0,
  size: '',
})
</script>

<template>
  <div class="atom-test" data-testid="atom-test">
    <span class="sr-only">atom-test</span>
  </div>
</template>
