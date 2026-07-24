<script setup lang="ts">
import { OrganismHeader } from '../../'
</script>

<template>
  <div class="template-default-portfolio" data-testid="template-default-portfolio">
    <OrganismHeader />
    <slot />
    <span class="sr-only">template-default-portfolio</span>
    <footer>Footer</footer>
  </div>
</template>
