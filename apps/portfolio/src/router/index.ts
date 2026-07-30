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
  },
  {
    path: ROUTES.HIS_CV_VIEW.path,
    name: ROUTES.HIS_CV_VIEW.name,
    component: () => import('@/views/HisCvView'),
  },
  {
    path: ROUTES.ABOUTE_ME_VIEW.path,
    name: ROUTES.ABOUTE_ME_VIEW.name,
    component: () => import('@/views/AboutMeView'),
  },
  {
    path: ROUTES.ABOUT_THIS_MONOREPO_VIEW.path,
    name: ROUTES.ABOUT_THIS_MONOREPO_VIEW.name,
    component: () => import('@/views/AboutThisMonorepoView'),
  },
  {
    path: ROUTES.ACTIVITY_VIEW.path,
    name: ROUTES.ACTIVITY_VIEW.name,
    component: () => import('@/views/ActivityView'),
  },
  // plop:inject-routes-component-do-not-removed
  {
    path: ROUTES.NOT_FOUND_VIEW.path,
    name: ROUTES.NOT_FOUND_VIEW.name,
    component: () => import('@/views/NotFoundView'),
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
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if ((to.name === 'login' || to.name === 'signup') && isAuthenticated()) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
