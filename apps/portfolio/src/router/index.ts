import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ROUTES } from '@/constants'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    layout?: 'DefaultLayout' | 'AuthLayout' | 'ErrorLayout'
    seo?: {
      title: string
      description: string
      type?: 'profile' | 'article' | 'website'
      schemaType?: 'ProfilePage' | 'TechArticle' | 'WebSite'
    }
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.HOME_VIEW.path,
    name: ROUTES.HOME_VIEW.name,
    component: () => import('@/views/HomeView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: 'Joshua Alexis Natividad Sardido | Frontend Architect Portfolio',
        description:
          'Explore the high-performance software engineering architecture workspace specializing in Vue 3, React, and Turborepo solutions.',
        type: 'website',
        schemaType: 'WebSite',
      },
    },
  },
  {
    path: ROUTES.CV_VIEW.path,
    name: ROUTES.CV_VIEW.name,
    component: () => import('@/views/CvView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: 'Curriculum Vitae | Joshua Alexis Natividad Sardido',
        description:
          'Professional engineering track record, core framework skills, and executive software project leading history.',
        type: 'profile',
      },
    },
  },
  {
    path: ROUTES.ABOUTE_ME_VIEW.path,
    name: ROUTES.ABOUTE_ME_VIEW.name,
    component: () => import('@/views/AboutMeView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: 'About Me | Senior Frontend Engineer Portfolio',
        description:
          'Explore the technical profile, engineering history, and modern web application insights of an expert Frontend Architect.',
        type: 'profile',
        schemaType: 'ProfilePage',
      },
    },
  },
  {
    path: ROUTES.ABOUT_THIS_MONOREPO_VIEW.path,
    name: ROUTES.ABOUT_THIS_MONOREPO_VIEW.name,
    component: () => import('@/views/AboutThisMonorepoView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: 'Monorepo Architecture Deep Dive | Vue 3 & React Portfolio',
        description:
          'An in-depth technical analysis of a highly optimized dual-framework workspace running Vite and Feature-Sliced Design.',
        type: 'article',
        schemaType: 'TechArticle',
      },
    },
  },
  {
    path: ROUTES.ACTIVITY_VIEW.path,
    name: ROUTES.ACTIVITY_VIEW.name,
    component: () => import('@/views/ActivityView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: 'Activity Telemetry & Rewards Log | Portfolio Hub',
        description: 'Live transaction tracking logs and reward metrics processing dashboard.',
        type: 'website',
      },
    },
  },
  // plop:inject-routes-component-do-not-removed
  {
    path: ROUTES.NOT_FOUND_VIEW.path,
    name: ROUTES.NOT_FOUND_VIEW.name,
    component: () => import('@/views/NotFoundView'),
    meta: {
      layout: 'DefaultLayout',
      seo: {
        title: '404 - Page Not Found | Portfolio Hub',
        description:
          'The requested route space does not exist or has been relocated within the workspace map.',
        type: 'website',
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const isAuthenticated = () => {
  return !!localStorage.getItem('mock_auth_token')
}

router.beforeEach((to) => {
  const authed = isAuthenticated()

  if (to.meta.requiresAuth && !authed) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if ((to.name === 'login' || to.name === 'signup') && authed) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
