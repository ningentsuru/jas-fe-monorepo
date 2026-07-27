<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Safely pull your hero single-file component live across network bounds at runtime
const FederatedHero = defineAsyncComponent(() => import('repo_ui_remote/OrganismHero'))
</script>

<template>
  <div class="home-view" data-testid="home-view">
    <Suspense>
      <template #default>
        <FederatedHero
          title="The Next Generation Portfolio Monorepo"
          subtitle="Fluid micro-frontend apps structured with Feature-Sliced Design. Atomic components optimized natively for Tailwind v4 theme variations."
          cta-label="Explore Sandbox"
          cta-href="https://jas-storybook.vercel.app"
          cta-target="_blank"
          secondary-label="Source Code"
          secondary-href="https://github.com"
          secondary-target="_blank"
          background-image="/hero-image.webp"
          background-video="/hero-video.mp4"
          align="center"
        />
      </template>

      <!-- Safe fallback container layout while components stream into the DOM frame -->
      <template #fallback>
        <div
          class="bg-background text-muted-foreground flex min-h-150 w-full animate-pulse items-center justify-center"
        >
          <p class="font-display text-sm tracking-wide">Streaming federated atom systems...</p>
        </div>
      </template>
    </Suspense>

    <div
      class="font-display border-border container mx-auto mt-6 max-w-2xl border-t px-4 py-12 text-center"
    >
      <p class="text-foreground mb-2 text-lg font-semibold">Architecture Architecture Verified</p>
      <p class="text-muted-foreground text-sm leading-relaxed">
        Success: Module Federation is active—streaming UI components live across network boundaries
        directly from a deployed Storybook asset deployment block.
      </p>
    </div>
    <span class="sr-only">home-view</span>
  </div>
</template>
