<script setup lang="ts">
import { OrganismHero } from '@repo/ui'
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <!-- Hero Header Component Layer (With verified background media paths) -->
    <OrganismHero
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

    <!-- Interactive Deployed Storybook Sandbox Platform Section -->
    <section id="component-sandbox" class="bg-muted/20 border-border mt-12 w-full border-t py-16">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-6 flex flex-col gap-2">
          <h2 class="font-display text-foreground text-3xl font-bold tracking-tight">
            Interactive UI System Playground
          </h2>
          <p class="text-muted-foreground text-sm">
            Live documentation and component sandbox environments streaming straight from our
            isolated architecture workspace layer.
          </p>
        </div>

        <!-- Stable Sandboxed Sandbox Iframe Node utilizing your Vercel Storybook dashboard deployment -->
        <div
          class="border-border bg-card h-[800px] w-full overflow-hidden rounded-xl border shadow-2xl"
        >
          <iframe
            src="https://jas-storybook.vercel.app"
            class="h-full w-full border-0"
            title="UI Component Design System Sandbox Workspace"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Project Pipeline Architecture Notes Feed (Cleaned and consolidated) -->
    <div class="font-display container mx-auto max-w-2xl px-4 py-12 text-center">
      <p class="text-foreground mb-2 text-base font-semibold">Work In Progress</p>
      <p class="text-muted-foreground text-sm leading-relaxed">
        Coming soon: Module Federation — sharing this design system live across independently
        deployed Vue and React apps.
      </p>
    </div>

    <span class="sr-only">home-view</span>
  </div>
</template>
