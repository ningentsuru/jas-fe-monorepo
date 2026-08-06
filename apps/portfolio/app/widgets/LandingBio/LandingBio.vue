<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  OrganismEducation,
  OrganismProfileHero,
  OrganismSkillDirectory,
  OrganismTimeline,
} from '@repo/ui-vue'

import {
  profilePayload,
  skillCategoriesPayload,
  techStackPayload,
  educationPayload,
  historicalTimeline,
} from '@/assets/data/profile'

const isClientReady = ref(false)

onMounted(() => {
  isClientReady.value = true
})
</script>

<template>
  <main
    class="landing-bio w-full space-y-12 py-6"
    data-testid="landing-bio"
    role="main"
    :aria-busy="!isClientReady"
    aria-live="polite"
  >
    <article aria-label="Professional Profile Summary">
      <OrganismProfileHero :profile="profilePayload" :is-loading="!isClientReady" />
    </article>

    <article
      aria-label="Core Technical Stack Directory"
      class="border-border border-t pt-12 first:border-t-0 first:pt-0"
    >
      <OrganismSkillDirectory
        :categories="skillCategoriesPayload"
        :tech-stack="techStackPayload"
        :is-loading="!isClientReady"
      />
    </article>

    <article
      aria-label="Professional Work History and Production Impacts"
      class="border-border border-t pt-12"
    >
      <OrganismTimeline :items="historicalTimeline" :is-loading="!isClientReady" />
    </article>

    <article aria-label="Academic Background and Education" class="border-border border-t pt-12">
      <OrganismEducation :education="educationPayload" :is-loading="!isClientReady" />
    </article>
  </main>
</template>
