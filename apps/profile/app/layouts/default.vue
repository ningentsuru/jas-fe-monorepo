<script setup lang="ts">
import { TemplateProfile } from '@repo/ui-vue'
</script>

<template>
  <TemplateProfile>
    <template #header> Header! </template>
    <NuxtPage />
    <template #footer> Footer! </template>
  </TemplateProfile>
</template>
