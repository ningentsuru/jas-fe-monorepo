<script setup lang="ts">
interface Props {
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div class="organism-header" data-testid="organism-header">
    <span class="sr-only">organism-header</span>
  </div>
</template>
