<script setup lang="ts">
import { Hammer, Sparkles, HardHat, Terminal } from '@lucide/vue'
import { Badge } from '#ui/components/ui/badge'
</script>

<template>
  <div
    class="about-me construction-page animate-fade-in flex w-full flex-col items-center justify-center space-y-10 px-4 py-16 text-center"
    data-testid="about-me"
  >
    <div
      class="bg-muted/50 border-border relative inline-flex items-center justify-center rounded-2xl border p-4 shadow-inner"
    >
      <HardHat class="text-primary size-12" />
      <Hammer
        class="text-foreground animation-duration-[2.5s] absolute -right-1 -bottom-1 size-6 animate-bounce"
      />
    </div>

    <div class="max-w-md space-y-4">
      <Badge
        variant="secondary"
        class="gap-1.5 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase select-none"
      >
        <Sparkles class="text-primary size-3 animate-pulse" />
        Compile In Progress
      </Badge>

      <h1 class="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
        Portfolio Under Construction
      </h1>

      <p class="text-muted-foreground text-sm leading-relaxed">
        Hi! I'm <span class="text-foreground font-semibold">Joshua Alexis Sardido</span>, a Frontend
        Engineer. I am currently modernizing my portfolio using a cutting-edge
        <span class="text-foreground font-semibold">Nuxt 4 monorepo and Tailwind CSS v4.0</span>
        architecture.
      </p>
    </div>

    <div
      class="text-muted-foreground flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs"
    >
      <span class="flex items-center gap-1"><Terminal class="size-3" /> @repo/ui-vue </span>
      <span>•</span>
      <span>pnpm workspaces</span>
      <span>•</span>
      <span>OKLCH Engine</span>
    </div>
    <span class="sr-only">about-me</span>
  </div>
</template>
