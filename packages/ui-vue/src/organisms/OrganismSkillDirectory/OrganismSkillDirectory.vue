<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { Code2 } from '@lucide/vue'
import { Button } from '#/components/ui/button'
import { AtomSkeleton } from '#/index'
import MoleculeTechCard from '../../molecules/MoleculeTechCard/MoleculeTechCard.vue'

interface SkillCategory {
  id: string
  label: string
}

interface TechItem {
  name: string
  category: string
  level: string
  icon: Component
}

interface Props {
  categories: SkillCategory[]
  techStack: TechItem[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  techStack: () => [],
  isLoading: false,
})

const selectedCategory = ref<string>('all')

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return props.techStack
  return props.techStack.filter((skill) => skill.category === selectedCategory.value)
})
</script>

<template>
  <section class="space-y-4" data-testid="organism-skill-directory">
    <template v-if="isLoading">
      <div
        class="animate-pulse space-y-4"
        role="img"
        aria-label="Loading technical skills directory..."
      >
        <div class="flex items-center gap-2">
          <AtomSkeleton class="size-5 rounded-md" />
          <AtomSkeleton class="h-6 w-44 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-1.5">
          <AtomSkeleton v-for="cat in categories" :key="cat.id" class="h-7 w-20 rounded-md" />
        </div>

        <div class="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
          <AtomSkeleton v-for="tech in filteredSkills" class="h-[46px] w-full rounded-lg" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-fade-in space-y-4">
        <div class="flex items-center gap-2">
          <Code2 class="text-muted-foreground size-5" aria-hidden="true" />
          <h2 class="text-foreground text-xl font-bold tracking-tight">Core Stack Directory</h2>
        </div>

        <div
          class="flex flex-wrap gap-1.5"
          role="toolbar"
          aria-label="Filter tech stack by category"
          v-if="categories.length"
        >
          <Button
            v-for="cat in categories"
            :key="cat.id"
            size="xs"
            type="button"
            :variant="selectedCategory === cat.id ? 'default' : 'secondary'"
            :aria-pressed="selectedCategory === cat.id"
            class="h-7 cursor-pointer rounded-md text-xs font-semibold"
            @click="selectedCategory = cat.id"
          >
            {{ cat.label }}
          </Button>
        </div>

        <dl class="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2" aria-live="polite">
          <div v-for="tech in filteredSkills" :key="tech.name">
            <dt class="sr-only">Technology Framework</dt>
            <dd>
              <MoleculeTechCard :name="tech.name" :level="tech.level" :icon="tech.icon" />
            </dd>
          </div>
        </dl>
      </div>
    </template>
  </section>
</template>
