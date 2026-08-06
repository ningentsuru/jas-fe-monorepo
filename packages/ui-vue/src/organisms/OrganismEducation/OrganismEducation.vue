<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'
import AtomSkeleton from '../../atoms/AtomSkeleton/AtomSkeleton.vue'

interface EducationInstitution {
  name: string
  period: string
  badge?: string
}

interface EducationDegree {
  title: string
  institutions: EducationInstitution[]
}

interface Props {
  education?: EducationDegree
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <section
    class="text-muted-foreground border-border flex flex-col gap-4 text-xs font-medium"
    data-testid="organism-education"
  >
    <template v-if="isLoading || !education">
      <div class="flex w-full animate-pulse items-start gap-2" aria-hidden="true">
        <AtomSkeleton class="mt-0.5 size-4 rounded-full" />
        <div class="flex-1 space-y-2.5">
          <AtomSkeleton class="h-5 w-2/3 rounded" />
          <div class="space-y-2">
            <div class="flex justify-between">
              <AtomSkeleton class="h-4 w-1/2 rounded" />
              <AtomSkeleton class="h-4 w-16 rounded" />
            </div>
            <div class="flex justify-between">
              <AtomSkeleton class="h-4 w-3/5 rounded" />
              <AtomSkeleton class="h-4 w-16 rounded" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-fade-in flex w-full items-start gap-2">
        <GraduationCap class="text-primary mt-0.5 size-4 shrink-0" />
        <div class="flex-1 space-y-2">
          <h3 class="text-foreground text-sm font-bold tracking-tight">
            {{ education.title }}
          </h3>

          <div class="space-y-1.5 pl-0">
            <div
              v-for="(inst, idx) in education.institutions"
              :key="inst.name + idx"
              class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
              :class="[idx > 0 ? 'text-muted-foreground/80' : 'text-foreground/90']"
            >
              <div class="flex flex-wrap items-center gap-1.5">
                <span>{{ inst.name }}</span>
                <span
                  v-if="inst.badge"
                  class="bg-muted text-muted-foreground/70 rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider uppercase select-none"
                >
                  {{ inst.badge }}
                </span>
              </div>
              <span class="font-semibold shrink-0">{{ inst.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
