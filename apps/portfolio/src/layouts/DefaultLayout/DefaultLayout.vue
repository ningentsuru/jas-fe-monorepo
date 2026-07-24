<script setup lang="ts">
import { TemplateDefaultPortfolio } from '@packages/ui'
</script>

<template>
  <TemplateDefaultPortfolio class="default-layout" data-testid="default-layout">
    <template #header> Header </template>
    <template #default>
      <main>
        <slot />
        <span class="sr-only">default-layout</span>
      </main>
    </template>
    <template #footer> Footer </template>
  </TemplateDefaultPortfolio>
</template>
