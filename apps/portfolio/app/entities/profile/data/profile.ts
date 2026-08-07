import { Code2, Terminal, Layers, Cpu, Sparkles } from '@lucide/vue'
import type {
  ProfilePayload,
  SkillCategory,
  TechStackItem,
  EducationPayload,
  TimelineItem,
} from '../model/types'

export const profilePayload: ProfilePayload = {
  statusBadge: 'Available for Advanced Architecture Tasks',
  fullName: 'Joshua Alexis Natividad Sardido',
  headline:
    'Frontend Engineer specializing in building and modernizing applications with <span class="text-foreground font-semibold">Vue 3, Nuxt 4, and TypeScript</span>.',
  phoneRaw: '09174028632',
  phoneFormatted: '0917-402-8632',
  location: 'General Trias City, Cavite, PH',
  email: 'ja.sardido@outlook.com',
}

export const skillCategoriesPayload: SkillCategory[] = [
  { id: 'all', label: 'All Tech' },
  { id: 'frontend', label: 'Frontend Core' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'devops', label: 'Cloud & CI/CD' },
  { id: 'ai', label: 'AI Operations' },
]

export const techStackPayload: TechStackItem[] = [
  { name: 'Vue.js 3 / Nuxt 4', category: 'frontend', level: 'Expert', icon: Code2 },
  { name: 'TypeScript / ES2025', category: 'frontend', level: 'Expert', icon: Terminal },
  { name: 'React 19 / Next.js 16', category: 'frontend', level: 'Advanced', icon: Layers },
  { name: 'TailwindCSS v4.0', category: 'frontend', level: 'Expert', icon: Code2 },
  { name: 'Pinia / Vuex', category: 'frontend', level: 'Expert', icon: Layers },
  { name: 'Laravel / PHP', category: 'backend', level: 'Advanced', icon: Terminal },
  { name: 'MySQL / NoSQL', category: 'backend', level: 'Advanced', icon: Cpu },
  { name: 'AWS (S3, ECS, CloudWatch)', category: 'devops', level: 'Advanced', icon: Cpu },
  { name: 'Docker', category: 'devops', level: 'Intermediate', icon: Cpu },
  { name: 'TeamCity CI/CD', category: 'devops', level: 'Advanced', icon: Terminal },
  { name: 'Claude Code / Copilot', category: 'ai', level: 'Expert', icon: Sparkles },
]

export const educationPayload: EducationPayload = {
  title: 'Bachelor of Science in Information Technology',
  institutions: [
    { name: 'STI Academic Center - Las Piñas', period: '2015 - 2017' },
    {
      name: 'University of Perpetual Help System DALTA - Las Piñas',
      period: '2012 - 2015',
      badge: 'Transferred',
    },
  ],
}

export const historicalTimeline: TimelineItem[] = [
  {
    role: 'Mid-Level Frontend Developer',
    company: 'Filta Global',
    period: 'Feb 2022 - Jul 2026',
    metrics: [
      'Maintained 8 production Vue.js repositories spanning Nuxt 2, Vue 2/Electron kiosks, Vue 3/Tauri rebuilds, and a Nuxt 4 monorepo; refactored shared code to cut merge conflicts by ~25% and improve long-term maintainability.',
      'Migrated Nuxt 2 applications from Node 14 to Node 16, closing critical security vulnerabilities; applied Claude Code Enterprise audits for memory-safety compliance, reducing runtime exceptions by ~20%.',
      'Improved average page load time by ~30% through targeted performance optimization; introduced Sentry error monitoring, cutting mean time to resolution for production incidents by ~35%.',
      'Collaborated with DevOps to manage TeamCity CI/CD pipelines and AWS S3 environment settings; maintained fail-fast build workflows that kept broken code from reaching production.',
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

export const starterPromptsPayload = [
  "What is Joshua's primary tech stack?",
  'Tell me about his experience with Nuxt 4.',
  'Is he available for new opportunities?',
  'Where was his most recent engineering role?',
]
