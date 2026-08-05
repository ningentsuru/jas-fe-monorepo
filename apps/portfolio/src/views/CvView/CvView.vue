<script setup lang="ts">
import { AtomButton } from '@repo/ui-vue'
import resume from '@/data/resume.json'
import { useDateFormat } from '@/composables/useDateFormat'

const { dateToFormat } = useDateFormat()

const formatResumeDate = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.toLowerCase() === 'present') return 'Present'

  return dateToFormat(dateStr, 'MMM YYYY')
}
</script>

<template>
  <article
    class="cv-view bg-background text-foreground border-border font-display mx-auto my-4 w-full border p-4 transition-colors duration-300 sm:p-12 print:border-transparent"
    data-testid="cv-view"
  >
    <header class="flex flex-col items-center justify-center text-center">
      <h1 class="text-xl font-bold tracking-tight sm:text-2xl">{{ resume.basics.name }}</h1>
      <p class="text-muted-foreground mt-1 text-lg font-medium sm:text-xl">
        {{ resume.basics.title }}
      </p>

      <address
        class="text-muted-foreground mt-2 flex flex-wrap justify-center gap-x-2 text-sm not-italic"
      >
        <span>{{ resume.basics.phone }}</span>
        <span class="text-border hidden sm:inline" aria-hidden="true">|</span>
        <span class="w-full text-center sm:w-auto">{{ resume.basics.address }}</span>
      </address>

      <nav
        aria-label="Social Profiles"
        class="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
      >
        <template v-for="(profile, index) of resume.basics.profiles" :key="profile.url">
          <AtomButton
            variant="link"
            :href="profile.url"
            :target="profile.url?.includes('@') ? '_self' : '_blank'"
            class="h-auto px-1 py-0 text-xs sm:text-sm"
          >
            {{ profile?.display || profile?.url }}
          </AtomButton>
          <span
            v-if="index < resume.basics.profiles.length - 1"
            class="text-border mx-0.5 hidden text-xs select-none sm:inline"
            aria-hidden="true"
          >
            |
          </span>
        </template>
      </nav>
    </header>

    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-summary">
      <h2
        id="heading-summary"
        class="border-border w-full border-b-2 pb-2 text-base font-bold tracking-wide sm:text-lg"
      >
        PROFESSIONAL SUMMARY
      </h2>
      <p class="text-foreground/90 mt-3 text-sm leading-relaxed sm:text-base">
        {{ resume.basics.summary }}
      </p>
    </section>

    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-skills">
      <h2
        id="heading-skills"
        class="border-border w-full border-b-2 pb-2 text-base font-bold tracking-wide sm:text-lg"
      >
        CORE TECHNICAL SKILLS
      </h2>

      <dl class="mt-3 w-full space-y-2 text-sm sm:text-base">
        <div
          v-for="skill of resume.skills"
          :key="skill.name"
          class="flex flex-col sm:flex-row sm:gap-x-2"
        >
          <dt class="shrink-0 font-bold">{{ skill.name }}:</dt>
          <dd class="text-foreground/90">
            <span
              v-for="word of skill.keywords"
              :key="`${skill.name}-${word}`"
              class="after:content-[',_'] last:after:content-none"
            >
              {{ word }}
            </span>
          </dd>
        </div>
      </dl>
    </section>

    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-work">
      <h2
        id="heading-work"
        class="border-border w-full border-b-2 pb-2 text-base font-bold tracking-wide sm:text-lg"
      >
        WORK EXPERIENCE
      </h2>

      <article
        v-for="work of resume.work"
        :key="work.startDate"
        class="mt-6 w-full print:break-inside-avoid"
      >
        <header
          class="flex flex-col items-start justify-between gap-y-1 sm:flex-row sm:items-baseline sm:gap-x-4"
        >
          <h3 class="sm:text-md text-sm font-bold">
            {{ work.position }}
            <span class="text-muted-foreground block font-normal sm:inline">| {{ work.name }}</span>
          </h3>

          <time
            :datetime="`${work.startDate}/${work.endDate}`"
            class="text-muted-foreground text-xs italic sm:text-sm"
          >
            {{ formatResumeDate(work.startDate) }} - {{ formatResumeDate(work.endDate) }}
          </time>
        </header>

        <ul role="list" class="mt-3 w-full space-y-2 text-sm leading-relaxed sm:text-base">
          <li
            v-for="highlight of work.highlights"
            :key="highlight"
            class="flex items-start gap-x-2"
          >
            <span class="text-foreground pl-1 select-none" aria-hidden="true">•</span>
            <span class="flex-1">{{ highlight }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-education">
      <h2
        id="heading-education"
        class="border-border w-full border-b-2 pb-2 text-base font-bold tracking-wide sm:text-lg"
      >
        EDUCATION
      </h2>

      <article
        v-for="education of resume.education"
        :key="education.startDate"
        class="mt-6 w-full print:break-inside-avoid"
      >
        <header
          class="flex flex-col items-start justify-between gap-y-1 sm:flex-row sm:items-baseline sm:gap-x-4"
        >
          <div>
            <h3 class="sm:text-md text-sm font-bold">
              {{ education.studyType }} in {{ education.area }}
            </h3>
            <p class="text-muted-foreground text-xs sm:text-sm">{{ education.institution }}</p>
          </div>
          <time
            :datetime="`${education.startDate}/${education.endDate}`"
            class="text-muted-foreground mt-1 text-xs italic sm:mt-0 sm:text-sm"
          >
            {{ formatResumeDate(education.startDate) }} - {{ formatResumeDate(education.endDate) }}
          </time>
        </header>
      </article>
    </section>

    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-languages">
      <h2
        id="heading-languages"
        class="border-border w-full border-b-2 pb-2 text-base font-bold tracking-wide sm:text-lg"
      >
        LANGUAGES
      </h2>

      <ul role="list" class="mt-3 w-full space-y-2 text-sm leading-relaxed sm:text-base">
        <li
          v-for="language of resume.languages"
          :key="language.language"
          class="flex items-start gap-x-2"
        >
          <span class="text-foreground pl-1 select-none" aria-hidden="true">•</span>
          <span class="flex-1">
            <strong>{{ language.language }}</strong> -
            <span class="text-muted-foreground text-xs sm:text-sm">{{ language.fluency }}</span>
          </span>
        </li>
      </ul>
    </section>

    <span class="sr-only">cv-view</span>
  </article>
</template>
