<script setup lang="ts">
import { Sparkles, Phone, MapPin } from '@lucide/vue'
import { Badge } from '#/components/ui/badge'
import { AtomSkeleton } from '#/index'

interface ProfileData {
  statusBadge: string
  fullName: string
  headline: string
  phoneRaw: string
  phoneFormatted: string
  location: string
}

interface Props {
  profile?: ProfileData
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <section class="space-y-4 text-center md:text-left" data-testid="organism-profile-hero">
    <template v-if="isLoading || !profile">
      <div
        class="animate-pulse space-y-4"
        role="img"
        aria-label="Loading profile header details..."
      >
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
        <Badge variant="outline" class="inline-flex items-center gap-2 px-3 py-1">
          <Sparkles class="size-3.5" aria-hidden="true" />
          {{ profile.statusBadge }}
        </Badge>

        <h1 class="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          {{ profile.fullName }}
        </h1>
        <p
          class="text-muted-foreground max-w-xl text-lg leading-relaxed font-medium"
          v-html="profile.headline"
        />

        <div class="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
          <a
            href="tel:09174028632"
            class="text-muted-foreground hover:text-primary group flex items-center gap-2.5 font-bold transition-colors"
            aria-label="`Call Joshua directly at ${profile.phoneFormatted}`"
          >
            <Phone class="size-4 transition-transform group-hover:scale-105" aria-hidden="true" />
            <span>0917-402-8632</span>
          </a>
          <span class="text-border hidden sm:inline" aria-hidden="true">|</span>
          <div class="text-muted-foreground flex items-center gap-1.5">
            <MapPin class="size-3.5" aria-hidden="true" />
            <span>{{ profile.location }}</span>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
