<script setup lang="ts">
import { ref } from 'vue'
import { AtomButton } from '@repo/ui'
import { useVueToPrint } from 'vue-to-print'
import resume from '@/data/resume.json'
import { useDateFormat } from '@/composables/useDateFormat'

const { dateToFormat } = useDateFormat()
const cvContent = ref<HTMLElement>(null!)

const { handlePrint } = useVueToPrint({
  content: cvContent,
  documentTitle: 'My-Resume',
})

const formatResumeDate = (dateStr: string) => {
  if (!dateStr) return ''
  if (dateStr.toLowerCase() === 'present') return 'Present'

  return dateToFormat(dateStr, 'MMM YYYY')
}
</script>

<template>
  <article
    ref="cvContent"
    class="his-cv-view bg-background text-foreground border-border font-display mx-auto my-12 w-full border p-12 transition-colors duration-300"
    data-testid="his-cv-view"
  >
    <!-- PDF Generation Toolbar -->
    <div class="hidden mb-6 flex justify-end print:hidden">
      <AtomButton variant="default" class="cursor-pointer font-medium" @click="handlePrint">
        🖨️ Save as PDF
      </AtomButton>
    </div>

    <header class="flex flex-col items-center justify-center text-center">
      <h1 class="text-2xl font-bold tracking-tight">{{ resume.basics.name }}</h1>
      <p class="text-muted-foreground mt-1 text-xl font-medium">{{ resume.basics.title }}</p>

      <!-- Contact Metadata -->
      <address class="text-muted-foreground mt-2 text-sm not-italic">
        <span>{{ resume.basics.phone }}</span>
        <span class="text-border mx-2" aria-hidden="true">|</span>
        <span>{{ resume.basics.address }}</span>
      </address>

      <!-- Contextual Links Navigation -->
      <nav
        aria-label="Social Profiles"
        class="mt-3 flex flex-wrap items-center justify-center gap-x-1"
      >
        <template v-for="(profile, index) of resume.basics.profiles" :key="profile.url">
          <AtomButton
            variant="link"
            :href="profile.url"
            :target="profile.url?.includes('@') ? '_self' : '_blank'"
          >
            {{ profile?.display || profile?.url }}
          </AtomButton>
          <span
            v-if="index < resume.basics.profiles.length - 1"
            class="text-border mx-1 select-none"
            aria-hidden="true"
          >
            |
          </span>
        </template>
      </nav>
    </header>

    <!-- Professional Summary -->
    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-summary">
      <h2
        id="heading-summary"
        class="border-border w-full border-b-3 pb-2 text-lg font-bold tracking-wide"
      >
        PROFESSIONAL SUMMARY
      </h2>
      <p class="text-foreground/90 mt-3 leading-relaxed">
        {{ resume.basics.summary }}
      </p>
    </section>

    <!-- Core Technical Skills -->
    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-skills">
      <h2
        id="heading-skills"
        class="border-border w-full border-b-3 pb-2 text-lg font-bold tracking-wide"
      >
        CORE TECHNICAL SKILLS
      </h2>

      <dl class="mt-3 w-full space-y-2">
        <div v-for="skill of resume.skills" :key="skill.name" class="flex flex-wrap gap-x-2">
          <dt class="font-bold">{{ skill.name }}:</dt>
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

    <!-- Work Experience -->
    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-work">
      <h2
        id="heading-work"
        class="border-border w-full border-b-3 pb-2 text-lg font-bold tracking-wide"
      >
        WORK EXPERIENCE
      </h2>

      <article
        v-for="work of resume.work"
        :key="work.startDate"
        class="mt-6 w-full print:break-inside-avoid"
      >
        <header class="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 class="text-md font-bold">
            {{ work.position }}
            <span class="text-muted-foreground font-normal">| {{ work.name }}</span>
          </h3>

          <time
            :datetime="`${work.startDate}/${work.endDate}`"
            class="text-muted-foreground text-sm italic"
          >
            {{ formatResumeDate(work.startDate) }} - {{ formatResumeDate(work.endDate) }}
          </time>
        </header>

        <ul role="list" class="mt-3 w-full space-y-2 leading-relaxed">
          <li
            v-for="highlight of work.highlights"
            :key="highlight"
            class="flex items-start gap-x-2"
          >
            <span class="text-foreground pl-2 select-none" aria-hidden="true">•</span>
            <span class="flex-1">{{ highlight }}</span>
          </li>
        </ul>
      </article>
    </section>

    <!-- Education Section -->
    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-education">
      <h2
        id="heading-education"
        class="border-border w-full border-b-3 pb-2 text-lg font-bold tracking-wide"
      >
        EDUCATION
      </h2>

      <article
        v-for="education of resume.education"
        :key="education.startDate"
        class="mt-6 w-full print:break-inside-avoid"
      >
        <header class="flex flex-wrap items-baseline justify-between gap-x-4">
          <div>
            <h3 class="text-md font-bold">{{ education.studyType }} in {{ education.area }}</h3>
            <p class="text-muted-foreground text-sm">{{ education.institution }}</p>
          </div>
          <time
            :datetime="`${education.startDate}/${education.endDate}`"
            class="text-muted-foreground text-sm italic"
          >
            {{ formatResumeDate(education.startDate) }} - {{ formatResumeDate(education.endDate) }}
          </time>
        </header>
      </article>
    </section>

    <!-- Languages Section -->
    <section class="mt-8 flex flex-col items-start" aria-labelledby="heading-languages">
      <h2
        id="heading-languages"
        class="border-border w-full border-b-3 pb-2 text-lg font-bold tracking-wide"
      >
        LANGUAGES
      </h2>

      <ul role="list" class="mt-3 w-full space-y-2 leading-relaxed">
        <li
          v-for="language of resume.languages"
          :key="language.language"
          class="flex items-start gap-x-2"
        >
          <span class="text-foreground pl-2 select-none" aria-hidden="true">•</span>
          <span class="flex-1">
            <strong>{{ language.language }}</strong> —
            <span class="text-muted-foreground text-sm">{{ language.fluency }}</span>
          </span>
        </li>
      </ul>
    </section>

    <span class="sr-only">his-cv-view</span>
  </article>
</template>
