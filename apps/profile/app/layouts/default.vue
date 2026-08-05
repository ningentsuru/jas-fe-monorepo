<script setup lang="ts">
import { computed } from 'vue'
import { AtomSkeleton, MoleculeThemeToggle, OrganismHeader, TemplateProfile } from '@repo/ui-vue'
import { useAppTheme } from '@/composables/useAppTheme'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const isLoadingClient = ref(true)

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})

onMounted(() => {
  isLoadingClient.value = false
})
</script>

<template>
  <TemplateProfile class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader :is-loading="isLoadingClient">
        <template #branding> Profile </template>
        <template #navigation> About Me </template>
        <template #theme-toggle>
          <ClientOnly>
            <MoleculeThemeToggle
              :is-toggled="isDark"
              :current-theme="getTheme"
              size="md"
              @toggle="toggleTheme"
              @set-theme="setTheme($event as Themes)"
            />
            <template #fallback>
              <AtomSkeleton class="bg-muted-foreground m-1 h-8 w-8 rounded-full" />
            </template>
          </ClientOnly>
        </template>
      </OrganismHeader>
    </template>
    <NuxtPage />
    <template #footer> <footer class="border-border border-t-2">Footer!</footer> </template>
  </TemplateProfile>
</template>
