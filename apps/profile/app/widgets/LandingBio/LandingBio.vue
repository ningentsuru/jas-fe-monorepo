<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  AtomSkeleton,
  OrganismProfileHero,
  OrganismSkillDirectory,
  OrganismTimeline,
  OrganismEducation,
} from '@repo/ui-vue'

const isClientReady = ref(false)

onMounted(() => {
  isClientReady.value = true
})

const historicalTimeline = [
  {
    role: 'Mid-Level Frontend Developer',
    company: 'Filta Global',
    period: 'Feb 2022 - Jul 2026',
    metrics: [
      'Maintained 8 production Vue.js repositories spanning Nuxt 2, Vue 2/Electron kiosks, Vue 3/Tauri rebuilds, and a Nuxt 4 monorepo; refactored shared code to cut merge conflicts by ~25% and improve long-term maintainability.',
      'Migrated Nuxt 2 applications from Node 14 to Node 16, closing critical security vulnerabilities; applied Claude Code Enterprise audits for memory-safety compliance, reducing runtime exceptions by ~20%.',
      'Improved average page load time by ~30% through targeted performance optimization; introduced Sentry error monitoring, cutting mean time to resolution for production incidents by ~35%.',
      'Owned TeamCity CI/CD pipelines and AWS S3 configuration management for production deployments, reducing release cycle time through reliable, automated workflows.',
      'Monitored Electron kiosk and Nuxt application logs via AWS CloudWatch and ECS, lowering mean time to resolution by ~25% and informing feature prioritization in JIRA.',
      'Partnered with UK-based backend, QA, and product teams to architect scalable API integrations and ship production-ready features ahead of schedule.',
      'Authored feature demo videos and architecture documentation in Confluence, shortening cross-team feedback cycles by ~30%.',
    ],
  },
  {
    role: 'Vue.js Developer',
    company: 'Collabera',
    period: 'Apr 2021 - Feb 2022',
    metrics: [
      'Extended and optimized enterprise Vue.js applications across multiple departments, improving performance and maintaining UI consistency across desktop and mobile.',
      'Integrated CMS APIs with backend teams under Agile workflows, streamlining data flow and shortening release cycles.',
      'Built automated cross-platform responsive-design checks, reducing bounce rate and ongoing maintenance effort.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'ZXY Development Technology Inc.',
    period: 'Jul 2020 - Mar 2021',
    metrics: [
      'Built and maintained an Inventory Management system for office equipment and products, cutting manual data entry by ~40% and improving asset visibility.',
      'Developed a Rider Evaluation platform to automate performance-based commission calculations, integrated with mobile app API endpoints, lifting rider satisfaction scores by ~25%.',
      'Managed a Visa Application system handling payments and sensitive documents; led end-to-end database analysis and QA-to-production testing, achieving 99.5% uptime.',
    ],
  },
  {
    role: 'IT Support / PHP Developer',
    company: 'Jinshenglong Business Support Inc.',
    period: 'Sep 2019 - Mar 2020',
    metrics: [
      'Built dynamic, searchable data tables and reporting dashboards handling large datasets to streamline cross-departmental analytics.',
      'Developed RESTful APIs with Laravel for mobile application logging and collaborated on database schema design to ensure data integrity.',
    ],
  },
  {
    role: 'IT Specialist / PHP Developer',
    company: 'TCL.Online Services Incorporated',
    period: 'Aug 2017 - Sep 2019',
    metrics: [
      'Architected and maintained scalable PHP platforms automating routine BPO agent tasks, cutting ticket-resolution time by ~30%.',
      'Engineered an interactive TCL Roku TV Troubleshooting Simulator with screenshot navigation and a virtual remote interface, reducing on-site troubleshooting cycles by ~40%.',
      'Built a monthly Q&A Knowledge Assessment Platform and a full HRIS suite (attendance, leave, overtime, scheduling, reporting), raising agent competency scores to 92%.',
    ],
  },
]
</script>

<template>
  <div class="landing-bio w-full space-y-12 py-6" data-testid="landing-bio">
    <OrganismProfileHero :is-loading="!isClientReady" />
    <hr class="border-border" />
    <OrganismSkillDirectory :is-loading="!isClientReady" />
    <hr class="border-border" />
    <OrganismTimeline :items="historicalTimeline" :is-loading="!isClientReady" />
    <hr class="border-border" />
    <OrganismEducation :is-loading="!isClientReady" />
    <span class="sr-only">landing-bio</span>
  </div>
</template>
