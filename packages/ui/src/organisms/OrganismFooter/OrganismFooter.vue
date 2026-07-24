<script setup lang="ts">
interface Props {
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div class="organism-footer" data-testid="organism-footer">
    <span class="sr-only">organism-footer</span>
  </div>
</template>
