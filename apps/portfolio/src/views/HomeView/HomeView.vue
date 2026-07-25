<script setup lang="ts">
import { OrganismHero } from '@repo/ui'
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <OrganismHero
      title="My Portfolio Monorepo"
      subtitle="Apps structured with Feature-Sliced Design. Components built on Atomic Design."
      cta-label="Get Started"
      cta-to="/his-cv"
      cta-target="_self"
      secondary-label="View on GitHub"
      secondary-href="https://github.com/ningentsuru"
      secondary-target="_blank"
      background-image="/hero-bg.jpg"
      align="center"
    />
    <p>
      Coming soon: Module Federation - sharing this design system live across independently deployed
      Vue and React apps.
    </p>
    <span class="sr-only">home-view</span>
  </div>
</template>
