<script setup lang="ts">
interface Props {
  character: string
}

const props = withDefaults(defineProps<Props>(), {
  character: '',
})
</script>

<template>
  <kbd
    class="atom-keyboard bg-card border-border text-foreground rounded border px-1 font-mono shadow-sm"
    data-testid="atom-keyboard"
  >
    {{ character }}<span class="sr-only">atom-keyboard</span></kbd
  >
</template>
