<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'About Me | Senior Frontend Engineer Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Explore the technical profile, engineering history, and modern web application insights of an expert Frontend Architect.'
    },
    { property: 'og:title', content: 'About Me | Senior Frontend Engineer Portfolio' },
    { property: 'og:description', content: 'Explore my engineering history and technical background.' },
    { property: 'og:type', content: 'profile' }
  ]
})
</script>

<template>
  <div class="aboute-me-view" data-testid="aboute-me-view">
    <h1 class="my-12">Work in progress... Todo: Will just add work related about me.</h1>
    <span class="sr-only">aboute-me-view</span>
  </div>
</template>
