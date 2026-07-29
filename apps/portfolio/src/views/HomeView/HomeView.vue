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
      secondary-href="https://github.com/ningentsuru"
      secondary-target="_blank"
      background-image="/hero-image.webp"
      background-video="/hero-video.mp4"
      align="center"
    />

    <div class="font-display container mx-auto max-w-2xl px-4 py-12 text-center">
      <p class="text-foreground mb-2 text-base font-semibold">Work In Progress</p>
      <p class="text-muted-foreground text-sm leading-relaxed">
        Coming soon: Module Federation - sharing this design system live across independently
        deployed Vue and React apps.
      </p>
    </div>

    <span class="sr-only">home-view</span>
  </div>
</template>
