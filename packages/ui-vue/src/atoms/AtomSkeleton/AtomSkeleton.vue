<script setup lang="ts">
import { Skeleton } from '#/components/ui/skeleton'
interface Props {
  class: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})
</script>

<template>
  <Skeleton class="atom-skeleton" :class="class" data-testid="atom-skeleton">
    <span class="sr-only">atom-skeleton</span>
  </Skeleton>
</template>
