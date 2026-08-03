<script setup lang="ts">
import { OrganismHero } from '@repo/ui-vue'
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <OrganismHero
      class="mt-4"
      title="The Next Generation Portfolio Monorepo"
      subtitle="Fluid micro-frontend apps structured with Feature-Sliced Design. Atomic components optimized natively for Tailwind v4 theme variations."
      cta-label="Get Started"
      cta-to="/about-this-monorepo"
      cta-target="_self"
      secondary-label="View on GitHub"
      secondary-href="https://github.com/ningentsuru/jas-fe-monorepo"
      secondary-target="_blank"
      background-image="/hero-image.webp"
      background-video="/hero-video.mp4"
      align="center"
    />

    <span class="sr-only">home-view</span>
  </div>
</template>
