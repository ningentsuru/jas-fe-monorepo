<script setup lang="ts">
import { OrganismHero } from '@packages/ui'
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <OrganismHero
      title="Build Faster with Vue"
      subtitle="A complete design system powered by Tailwind CSS and accessible components."
      cta-label="Get Started"
      cta-to="/docs"
      cta-target="_self"
      secondary-label="View on GitHub"
      secondary-href="https://github.com/ningentsuru"
      secondary-target="_blank"
      background-image="/hero-bg.jpg"
      align="center"
    />
    <span class="sr-only">home-view</span>
  </div>
</template>
