<script setup lang="ts">
import LandingBio from '@/widgets/LandingBio.vue'

useSeoMeta({
  title: 'Joshua Alexis Sardido | Frontend Engineer',
  description:
    '6+ years experienced Frontend Engineer specializing in Vue.js 3, Nuxt 4, and TypeScript architecture. Check out my production portfolio and metrics.',

  ogTitle: 'Joshua Alexis Sardido | Frontend Engineer',
  ogDescription:
    'Frontend Engineer specializing in building and modernizing enterprise scale applications with Vue 3, Nuxt 4, and TypeScript.',
  ogType: 'profile',
  ogUrl: 'https://jas-fawn.vercel.app',
  ogSiteName: 'Joshua Alexis Sardido Portfolio',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Joshua Alexis Sardido | Frontend Engineer',
  twitterDescription:
    '6+ years engineering scalable applications with Vue 3, Nuxt 4, and TypeScript.',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://jas-fawn.vercel.app',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Joshua Alexis Natividad Sardido',
          jobTitle: 'Frontend Engineer',
          telephone: '+639174028632',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'General Trias City',
            addressRegion: 'Cavite',
            addressCountry: 'PH',
          },
          knowsAbout: [
            'Vue.js 3',
            'Nuxt 4',
            'TypeScript',
            'React 19',
            'Next.js 16',
            'TailwindCSS v4.0',
            'Pinia',
            'Laravel',
            'PHP',
            'MySQL',
            'AWS',
            'Docker',
            'TeamCity CI/CD',
            'Claude Code',
          ],
        },
      }),
    },
  ] as unknown as [],
})
</script>

<template>
  <LandingBio />
</template>
