<script setup lang="ts"></script>

<template>
  <div class="template-profile flex min-h-screen flex-col" data-testid="template-profile">
    <slot name="header" />
    <div class="flex min-h-0 w-full flex-1 flex-col">
      <slot name="default" />
    </div>
    <slot name="footer" />
    <span class="sr-only">template-profile</span>
  </div>
</template>
