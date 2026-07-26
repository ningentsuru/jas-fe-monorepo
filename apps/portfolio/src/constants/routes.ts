export const ROUTES = {
  HOME_VIEW: { name: 'home', path: '/' },
  HIS_CV_VIEW: { name: 'hisCv', path: '/his-cv' },
  ABOUTE_ME_VIEW: { name: 'abouteMe', path: '/about-me' },
  ABOUT_THIS_MONOREPO_VIEW: { name: 'aboutThisMonorepo', path: '/about-this-monorepo' },
  JOB_SEARCH_VIEW: { name: 'jobSearch', path: '/job-search' },
  // plop:inject-routes-do-not-removed
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
