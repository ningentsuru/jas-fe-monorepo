<script setup lang="ts">
import { Briefcase } from '@lucide/vue'
import { AtomSkeleton } from '../../'

interface JobItem {
  role: string
  company: string
  period: string
  metrics: string[]
}

interface Props {
  items: JobItem[]
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  items: () => [],
  isLoading: false,
})
</script>

<template>
  <section class="space-y-6" data-testid="organism-timeline">
    <template v-if="isLoading">
      <div class="flex items-center gap-2">
        <AtomSkeleton class="size-5 rounded-md" />
        <AtomSkeleton class="h-6 w-44 rounded-md" />
      </div>
      <div class="animate-pulse space-y-6" aria-hidden="true">
        <div v-for="i in 3" :key="i" class="border-border relative space-y-2 border-l pl-4">
          <div class="bg-border absolute top-1.5 -left-[5px] size-2 rounded-full" />

          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <AtomSkeleton class="h-5 w-2/3 rounded sm:w-1/2" />
            <AtomSkeleton class="h-4 w-24 rounded" />
          </div>

          <ul class="list-none space-y-2 pt-0.5 pl-0">
            <li class="flex items-start gap-2">
              <span
                class="text-muted-foreground/30 pt-0.5 text-base leading-none font-bold select-none"
                >›</span
              >
              <AtomSkeleton class="h-4 w-full rounded" />
            </li>
            <li class="flex items-start gap-2">
              <span
                class="text-muted-foreground/30 pt-0.5 text-base leading-none font-bold select-none"
                >›</span
              >
              <AtomSkeleton class="h-4 w-5/6 rounded" />
            </li>
            <li class="flex items-start gap-2">
              <span
                class="text-muted-foreground/30 pt-0.5 text-base leading-none font-bold select-none"
                >›</span
              >
              <AtomSkeleton class="h-4 w-4/5 rounded" />
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-fade-in space-y-6">
        <div class="flex items-center gap-2">
          <Briefcase class="text-muted-foreground size-5" />
          <h2 class="text-foreground text-xl font-bold tracking-tight">Production Impacts</h2>
        </div>
        <div
          v-for="job in items"
          :key="job.company + job.role"
          class="border-border group relative space-y-2 border-l pl-4"
        >
          <div
            class="bg-border group-hover:bg-primary absolute top-1.5 -left-[5px] size-2 rounded-full transition-colors duration-300"
          />

          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 class="text-md text-foreground font-bold tracking-tight">
              {{ job.role }}
              <span class="text-muted-foreground font-normal">at {{ job.company }}</span>
            </h3>
            <span class="text-muted-foreground shrink-0 text-xs font-semibold select-none">
              {{ job.period }}
            </span>
          </div>

          <ul class="text-muted-foreground list-none space-y-2 pt-0.5 pl-0 text-sm">
            <li v-for="metric in job.metrics" :key="metric" class="flex items-start gap-2">
              <span class="text-primary pt-0.5 text-base leading-none font-bold select-none"
                >›</span
              >
              <span class="leading-relaxed">{{ metric }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>
