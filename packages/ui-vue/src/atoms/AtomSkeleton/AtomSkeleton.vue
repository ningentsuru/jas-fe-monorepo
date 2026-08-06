<script setup lang="ts">
import { Skeleton } from '#/components/ui/skeleton'
</script>

<template>
  <Skeleton
    class="atom-skeleton animate-pulse"
    data-testid="atom-skeleton"
    role="img"
    aria-label="Loading component content..."
  >
    <span class="sr-only"
      >Visual placeholder for ongoing data fetch operations. Layout will populate momentarily.</span
    >
  </Skeleton>
</template>
