<script setup lang="ts"></script>

<template>
  <div
    class="template-default-portfolio flex min-h-screen flex-col"
    data-testid="template-default-portfolio"
  >
    <slot name="header" />

    <!-- CRITICAL: flex-1 + min-h-0 + flex flex-col -->
    <div class="flex min-h-0 w-full flex-1 flex-col">
      <slot name="default" />
    </div>

    <slot name="footer" />
    <span class="sr-only">template-default-portfolio</span>
  </div>
</template>
