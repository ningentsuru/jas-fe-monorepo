<script setup lang="ts"></script>

<template>
  <div class="template-profile flex min-h-screen flex-col" data-testid="template-profile">
    <slot name="header" />
    <slot name="default" />
    <slot name="footer" />
    <slot name="overlay" />
    <span class="sr-only">template-profile</span>
  </div>
</template>
