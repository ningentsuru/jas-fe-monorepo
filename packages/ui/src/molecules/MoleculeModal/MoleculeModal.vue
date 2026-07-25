<script setup lang="ts">
interface Props {
  title?: string
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  show: false,
})
</script>

<template>
  <dialog
    :open="props.show"
    class="molecule-modal border-border flex flex-col gap-6"
    data-testid="molecule-modal"
  >
    <h1 v-if="props.title">{{ props.title }}</h1>
    <slot name="default" />
    <slot name="footer" />
    <span class="sr-only">molecule-modal</span>
  </dialog>
</template>
