<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'About Me | Senior Frontend Engineer Portfolio',
  meta: [
    {
      name: 'description',
      content:
        'Explore the technical profile, engineering history, and modern web application insights of an expert Frontend Architect.',
    },
    { property: 'og:title', content: 'About Me | Senior Frontend Engineer Portfolio' },
    {
      property: 'og:description',
      content: 'Explore my engineering history and technical background.',
    },
    { property: 'og:type', content: 'profile' },
  ],

  script: [
    {
      type: 'application/ld+json',
      key: 'about-me-schema',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Joshua Alexis Natividad Sardido',
          jobTitle: 'Senior Frontend Engineer & Software Architect',
          description:
            'Expert Frontend Architect specializing in high-performance monorepos, Vue 3, and React system engineering.',
          url: 'https://jas-fawn.vercel.app/about-me',
          sameAs: [
            'https://github.com/ningentsuru',
            'https://www.linkedin.com/in/joshua-alexis-sardido',
          ],
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="aboute-me-view" data-testid="aboute-me-view">
    <h1 class="my-12">Work in progress... Todo: Will just add work related about me.</h1>
    <span class="sr-only">aboute-me-view</span>
  </div>
</template>
