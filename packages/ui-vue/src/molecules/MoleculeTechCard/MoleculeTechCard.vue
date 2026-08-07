<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'

interface Props {
  name: string
  level: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <Card
    class="hover:border-ring/40 p-3 transition-all duration-300 hover:shadow-sm"
    data-testid="molecule-tech-card"
  >
    <CardContent class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <component :is="icon" class="text-muted-foreground size-4 shrink-0" />
        <span class="text-card-foreground text-sm font-semibold tracking-tight">
          {{ name }}
        </span>
      </div>

      <Badge
        variant="secondary"
        class="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase select-none"
      >
        {{ level }}
      </Badge>
    </CardContent>
  </Card>
</template>
