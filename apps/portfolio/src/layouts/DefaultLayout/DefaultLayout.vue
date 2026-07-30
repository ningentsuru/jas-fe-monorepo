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

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})

useHead({
  title: () => route.meta.seo?.title || 'Joshua Alexis Natividad Sardido | Portfolio Hub',
  meta: () => [
    {
      name: 'description',
      content:
        route.meta.seo?.description ||
        'Explore my high-performance software engineering architecture workspace.',
    },
    { property: 'og:title', content: route.meta.seo?.title },
    { property: 'og:description', content: route.meta.seo?.description },
    { property: 'og:type', content: route.meta.seo?.type || 'website' },
    { property: 'og:url', content: () => `https://vercel.app${route.path}` },
  ],
  script: () => {
    const schemaType = route.meta.seo?.schemaType
    if (!schemaType) return []

    const personalEntity = {
      '@type': 'Person',
      name: 'Joshua Alexis Natividad Sardido',
      jobTitle: 'Senior Frontend Engineer & Software Architect',
      url: 'https://jas-fawn.vercel.app/about-me',
      sameAs: [
        'https://github.com/ningentsuru',
        'https://www.linkedin.com/in/joshua-alexis-sardido',
      ],
    }

    let payload: Record<string, unknown> | null = null

    if (schemaType === 'ProfilePage') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: personalEntity,
      }
    } else if (schemaType === 'TechArticle') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: route.meta.seo?.title,
        description: route.meta.seo?.description,
        dependencies: 'Vue 3, React 19, Turborepo, Tailwind CSS v4',
        author: personalEntity,
        image: ['https://vercel.app'],
        publisher: {
          '@type': 'Organization',
          name: 'Joshua Alexis Natividad Sardido',
          logo: {
            '@type': 'ImageObject',
            url: 'https://jas-fawn.vercel.app/about-this-monorepo',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://jas-fawn.vercel.app${route.path}`,
        },
      }
    } else if (schemaType === 'WebSite') {
      payload = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: route.meta.seo?.title,
        url: 'https://jas-fawn.vercel.app/',
      }
    }

    return payload
      ? [
          {
            type: 'application/ld+json',
            key: 'layout-jsonld-schema',
            innerHTML: JSON.stringify(payload),
          },
        ]
      : []
  },
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
              <AtomWordSwap :words="['u', 'e']" :interval="2000" transition="slide-down" />
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
