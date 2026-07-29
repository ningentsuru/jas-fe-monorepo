<script setup lang="ts">
import { ref } from 'vue'
import { MoleculeCarousel, AtomKeyboard } from '@repo/ui-vue'

export interface CarouselItem {
  id: string | number
  image?: string
  title?: string
  description?: string
  alt?: string
}

const portfolioProjects = ref<CarouselItem[]>([
  {
    id: 'proj-1',
    image: '/images/showcase-monorepo.webp',
    title: 'Design System Workspace Infrastructure',
    description:
      'Isolated atomic library configuration using shared monorepo scoping tokens and Tailwind v4 compilation hooks.',
    alt: 'Monorepo code repository folder structure tree mapping diagram',
  },
  {
    id: 'proj-2',
    image: '/images/showcase-federation.webp',
    title: 'Distributed Micro-Frontend Hub',
    description:
      'Runtime remote component streaming pipeline built across isolated framework application nodes.',
    alt: 'Visual visualization representation mapping asynchronous javascript bundle stream boundaries',
  },
  {
    id: 'proj-3',
    image: '/images/showcase-dashboard.webp',
    title: 'E-Commerce Analytics Engine',
    description:
      'High-throughput transactional indexing pipeline optimized with Feature-Sliced Design constraints.',
    alt: 'Custom interactive visualization analytics metric dashboard preview graphic',
  },
])

const currentSlideIndex = ref(0)

function handleSlideChange(newIndex: number) {
  currentSlideIndex.value = newIndex
}
</script>

<template>
  <div
    class="about-this-monorepo-view bg-background font-display w-full py-12"
    data-testid="about-this-monorepo-view"
  >
    <div class="container mx-auto flex flex-col gap-8">
      <div class="border-border flex flex-col gap-1 border-b pb-4">
        <h2 class="text-foreground text-2xl font-bold tracking-tight">
          Production Architecture Deployments
        </h2>
        <p class="text-muted-foreground text-sm">
          Explore interactive platform modules managed within our isolated package environments.
        </p>
      </div>

      <div class="w-full">
        <MoleculeCarousel
          :items="portfolioProjects"
          :auto-play="true"
          :interval="3000"
          :loop="true"
          @change="handleSlideChange"
          class="shadow-xl"
        />
      </div>

      <div class="meta-footer bg-muted/30 border-border flex flex-col gap-2 rounded-lg border p-4">
        <div class="text-primary font-mono text-xs font-semibold tracking-wider uppercase">
          Active Monitor Feed Tracker
        </div>
        <div class="text-foreground text-sm">
          You are currently reviewing index sequence entry node:
          <span
            class="text-primary bg-card border-border rounded border px-2 py-0.5 font-mono font-bold"
          >
            {{ currentSlideIndex + 1 }} / {{ portfolioProjects.length }}
          </span>
        </div>
        <div class="text-muted-foreground mt-1 text-xs italic">
          Pro-Tip: Use your desktop keyboard
          <AtomKeyboard character="←" />
          and
          <AtomKeyboard character="→" />
          keys to slide manually when the card is focused.
        </div>
      </div>
    </div>
    <span class="sr-only">about-this-monorepo-view</span>
  </div>
</template>
