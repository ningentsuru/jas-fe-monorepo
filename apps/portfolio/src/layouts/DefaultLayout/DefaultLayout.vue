<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  TemplateDefaultPortfolio,
  OrganismHeader,
  OrganismFooter,
  MoleculeThemeToggle,
  AtomWordSwap,
  AtomButton,
} from '@repo/ui-vue'
import { useAppTheme } from '@/composables/useAppTheme'
import { NAVIGATIONS } from '@/constants'
import type { Themes, NavItem } from '@/types'

const route = useRoute()
const { isDark, theme, toggleTheme, setTheme } = useAppTheme()

const navItems = NAVIGATIONS as unknown as NavItem[]

const seoConfig = computed(() => route.meta.seo)

const personalEntity = {
  '@type': 'Person',
  name: 'Joshua Alexis Natividad Sardido',
  jobTitle: 'Senior Frontend Engineer & Software Architect',
  url: 'https://vercel.app',
  sameAs: ['https://github.com', 'https://linkedin.com'],
}

const schemaPayload = computed(() => {
  const config = seoConfig.value
  if (!config?.schemaType) return null

  if (config.schemaType === 'ProfilePage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: personalEntity,
    }
  }

  if (config.schemaType === 'TechArticle') {
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: config.title,
      description: config.description,
      author: personalEntity,
      dependencies: 'Vue 3, React 19, Turborepo, Tailwind CSS v4',
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.title,
    url: 'https://vercel.app',
  }
})

useHead({
  title: () => seoConfig.value?.title || 'Joshua Alexis Natividad Sardido | Portfolio Hub',
  meta: () => [
    {
      name: 'description',
      content:
        seoConfig.value?.description ||
        'Explore the technical profile, engineering history, and web application solutions of an expert Frontend Architect.',
    },
    { property: 'og:title', content: seoConfig.value?.title || 'Joshua Alexis Natividad Sardido' },
    { property: 'og:description', content: seoConfig.value?.description || 'Portfolio Hub' },
    { property: 'og:type', content: seoConfig.value?.type || 'website' },
    { property: 'og:url', content: `https://vercel.app${route.path}` },
  ],
  script: () => {
    const payload = schemaPayload.value
    return payload ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(payload) }] : []
  },
})

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})
</script>

<template>
  <TemplateDefaultPortfolio class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader :nav-items="navItems">
        <template #branding>
          <AtomButton class="shrink-0 p-0!" to="/">
            <h1 class="text-foreground flex items-center justify-center text-lg font-semibold">
              <span class="hidden sm:inline">Your N</span>
              <span class="sm:hidden">N</span>
              <AtomWordSwap
                canvas
                :words="['u', 'e']"
                :interval="2000"
                transition="slide-down"
                class=""
              />
              <span class="hidden sm:inline">xt Frontend Developer</span>
              <span class="sm:hidden">xt Developer</span>
            </h1>
          </AtomButton>
        </template>
        <template #theme-toggle>
          <MoleculeThemeToggle
            :is-toggled="isDark"
            :current-theme="getTheme"
            @toggle="toggleTheme"
            @set-theme="setTheme($event as Themes)"
          />
        </template>
      </OrganismHeader>
    </template>

    <template #default>
      <Suspense>
        <template #default>
          <main class="container mx-auto flex h-full min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
            <slot />
            <span class="sr-only">default-layout</span>
          </main>
        </template>
        <template #fallback>
          <main class="flex h-screen w-screen items-center justify-center">Loading data...</main>
        </template>
      </Suspense>
    </template>

    <template #footer>
      <OrganismFooter title="This is footer">
        <div>Note: By holding the theme toggle you can choose different themes.</div>
        <div>Todo: Add contact me component here.</div>
      </OrganismFooter>
    </template>
  </TemplateDefaultPortfolio>
</template>
