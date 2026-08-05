<script setup lang="ts">
import { ref, computed } from 'vue'
import { Code2, Terminal, Layers, Cpu, Sparkles } from '@lucide/vue'
import { Button } from '#/components/ui/button'
import { AtomSkeleton } from '../../'
import MoleculeTechCard from '../../molecules/MoleculeTechCard/MoleculeTechCard.vue'

type FilterCategory = 'all' | 'frontend' | 'backend' | 'devops' | 'ai'

interface Props {
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const selectedCategory = ref<FilterCategory>('all')

const skillCategories = [
  { id: 'all', label: 'All Tech' },
  { id: 'frontend', label: 'Frontend Core' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'devops', label: 'Cloud & CI/CD' },
  { id: 'ai', label: 'AI Operations' },
] as const

const techStack = [
  { name: 'Vue.js 3 / Nuxt 4', category: 'frontend', level: 'Expert', icon: Code2 },
  { name: 'TypeScript / ES2025', category: 'frontend', level: 'Expert', icon: Terminal },
  { name: 'React 19 / Next.js 16', category: 'frontend', level: 'Advanced', icon: Layers },
  { name: 'TailwindCSS v4.0', category: 'frontend', level: 'Expert', icon: Code2 },
  { name: 'Pinia / Vuex', category: 'frontend', level: 'Expert', icon: Layers },
  { name: 'Laravel / PHP', category: 'backend', level: 'Advanced', icon: Terminal },
  { name: 'MySQL / NoSQL', category: 'backend', level: 'Advanced', icon: Cpu },
  { name: 'AWS (S3, ECS, CloudWatch)', category: 'devops', level: 'Advanced', icon: Cpu },
  { name: 'Docker', category: 'devops', level: 'Intermediate', icon: Cpu },
  { name: 'TeamCity CI/CD', category: 'devops', level: 'Advanced', icon: Terminal },
  { name: 'Claude Code / Copilot', category: 'ai', level: 'Expert', icon: Sparkles },
] as const

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return techStack
  return techStack.filter((skill) => skill.category === selectedCategory.value)
})
</script>

<template>
  <section class="space-y-4" data-testid="organism-skill-directory">
    <template v-if="isLoading">
      <div class="animate-pulse space-y-4" aria-hidden="true">
        <div class="flex items-center gap-2">
          <AtomSkeleton class="size-5 rounded-md" />
          <AtomSkeleton class="h-6 w-44 rounded-md" />
        </div>

        <div class="flex flex-wrap gap-1.5">
          <AtomSkeleton v-for="i in 5" :key="i" class="h-7 w-20 rounded-md" />
        </div>

        <div class="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
          <AtomSkeleton v-for="i in 6" :key="i" class="h-[46px] w-full rounded-lg" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-fade-in space-y-4">
        <div class="flex items-center gap-2">
          <Code2 class="text-muted-foreground size-5" />
          <h2 class="text-foreground text-xl font-bold tracking-tight">Core Stack Directory</h2>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <Button
            v-for="cat in skillCategories"
            :key="cat.id"
            size="xs"
            type="button"
            :variant="selectedCategory === cat.id ? 'default' : 'secondary'"
            class="h-7 cursor-pointer rounded-md text-xs font-semibold shadow-none transition-all"
            @click="selectedCategory = cat.id"
          >
            {{ cat.label }}
          </Button>
        </div>

        <div class="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
          <MoleculeTechCard
            v-for="tech in filteredSkills"
            :key="tech.name"
            :name="tech.name"
            :level="tech.level"
            :icon="tech.icon"
          />
        </div>
      </div>
    </template>
  </section>
</template>
