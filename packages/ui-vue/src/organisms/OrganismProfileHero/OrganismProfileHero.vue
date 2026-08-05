<script setup lang="ts">
import { Sparkles, Phone, MapPin } from '@lucide/vue'
import { Badge } from '#/components/ui/badge'
import { AtomSkeleton } from '../../'

interface Props {
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <section class="space-y-4 text-center md:text-left" data-testid="organism-profile-hero">
    <template v-if="isLoading">
      <div class="animate-pulse space-y-4" aria-hidden="true">
        <div class="flex justify-center md:justify-start">
          <AtomSkeleton class="h-6 w-64 rounded-full" />
        </div>

        <div class="flex flex-col items-center gap-2 md:items-start">
          <AtomSkeleton class="h-10 w-5/6 max-w-2xl rounded-md sm:h-12 sm:w-3/4" />
        </div>

        <div class="flex flex-col items-center space-y-2 pt-1 md:items-start">
          <AtomSkeleton class="h-5 w-full max-w-xl rounded-md" />
          <AtomSkeleton class="h-5 w-4/5 max-w-md rounded-md" />
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start">
          <AtomSkeleton class="h-4 w-28 rounded" />
          <span class="text-border hidden sm:inline">|</span>
          <AtomSkeleton class="h-4 w-44 rounded" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-fade-in space-y-4">
        <Badge
          variant="outline"
          class="bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-full border-transparent px-3 py-1 text-xs font-medium"
        >
          <Sparkles class="text-primary size-3.5 animate-pulse" />
          Available for Advanced Architecture Tasks
        </Badge>

        <h1 class="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          Joshua Alexis Natividad Sardido
        </h1>

        <p class="text-muted-foreground max-w-xl text-lg leading-relaxed font-medium">
          Frontend Engineer specializing in building and modernizing applications with
          <span class="text-foreground font-semibold">Vue 3, Nuxt 4, and TypeScript</span>.
        </p>

        <div
          class="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm font-medium md:justify-start"
        >
          <a
            href="tel:09174028632"
            class="text-primary group flex items-center gap-1.5 font-bold hover:underline"
          >
            <Phone
              class="text-muted-foreground group-hover:text-primary size-3.5 transition-colors"
            />
            <span>0917-402-8632</span>
          </a>
          <span class="text-border hidden sm:inline">|</span>
          <div class="text-muted-foreground flex items-center gap-1.5">
            <MapPin class="size-3.5" />
            <span>General Trias City, Cavite, PH</span>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
