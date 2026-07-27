<script setup lang="ts">
import { OrganismHero } from '@repo/ui'
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <OrganismHero
      title="The Next Generation Portfolio Monorepo"
      subtitle="Fluid micro-frontend apps structured with Feature-Sliced Design. Atomic components optimized natively for Tailwind v4 theme variations."
      cta-label="Explore Sandbox"
      cta-href="https://ningentsuru.com"
      cta-target="_blank"
      secondary-label="Source Code"
      secondary-href="https://github.com"
      secondary-target="_blank"
      background-image="/hero-image.webp"
      background-video="/hero-video.mp4"
      align="center"
    />

    <div class="font-display container mx-auto max-w-2xl px-4 py-12 text-center">
      <p class="text-foreground mb-2 animate-pulse text-lg font-semibold">Work in Progress</p>
      <p class="text-muted-foreground text-sm leading-relaxed">
        Coming soon: Module Federation—streaming this design system live across network boundaries
        to independently deployed Vue and React applications.
      </p>
    </div>
    <span class="sr-only">home-view</span>
  </div>
</template>
