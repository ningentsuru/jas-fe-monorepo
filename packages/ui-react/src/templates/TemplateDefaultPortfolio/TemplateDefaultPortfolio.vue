<script setup lang="ts"></script>

<template>
  <div
    class="template-default-portfolio flex min-h-dvh flex-col"
    data-testid="template-default-portfolio"
  >
    <slot name="header" />

    <div class="flex min-h-0 w-full flex-1 flex-col">
      <slot name="default" />
    </div>

    <slot name="footer" />
    <span class="sr-only">template-default-portfolio</span>
  </div>
</template>
