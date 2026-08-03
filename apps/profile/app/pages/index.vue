<script setup lang="ts">
import { AtomButton } from '@repo/ui-vue'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center space-y-4 bg-slate-50">
    <h1 class="text-4xl font-extrabold tracking-tight text-indigo-600">Profile App Live!</h1>
    <p class="text-gray-600">Tailwind + FSD Layer Architecture is up and running.</p>

    <AtomButton variant="primary">Shared Workspace Button</AtomButton>
  </div>
</template>
