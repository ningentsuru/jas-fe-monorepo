<script setup lang="ts">
import { computed } from 'vue'
import { AtomSkeleton, MoleculeThemeToggle } from '@repo/ui-vue'
import { useAppTheme } from '@/composables/useAppTheme'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})
</script>

<template>
  <div class="home-page flex flex-1 items-center justify-center" data-testid="home-page">
    <ClientOnly>
      <MoleculeThemeToggle
        :is-toggled="isDark"
        :current-theme="getTheme"
        size="lg"
        @toggle="toggleTheme"
        @set-theme="setTheme($event as Themes)"
      />
      <template #fallback>
        <AtomSkeleton class="bg-muted-foreground m-1 h-8 w-8 rounded-full" />
      </template>
    </ClientOnly>
  </div>
</template>
