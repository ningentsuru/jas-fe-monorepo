<script setup lang="ts">
import { OrganismHero, MoleculeTooltip, AtomButton } from '@repo/ui'
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
    <div class="flex w-full justify-center">
      <MoleculeTooltip title="Actions" position="top" :delay="100">
        <!-- Trigger (Default Slot) -->
        <AtomButton variant="ghost">Click/Hover Me</AtomButton>

        <!-- Interactive Content (Named Slot) -->
        <template #content>
          <div class="mt-2 flex gap-2">
            <AtomButton size="sm" variant="primary" @click="">Save</AtomButton>
            <AtomButton size="sm" variant="ghost" @click="">Canceleeeeeee</AtomButton>
          </div>
        </template>
      </MoleculeTooltip>
    </div>
    <p>
      Coming soon: Module Federation - sharing this design system live across independently deployed
      Vue and React apps.
    </p>
    <span class="sr-only">home-view</span>
  </div>
</template>
