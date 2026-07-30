export const ROUTES = {
  HOME_VIEW: { name: 'home', path: '/' },
  HIS_CV_VIEW: { name: 'hisCv', path: '/his-cv' },
  ABOUTE_ME_VIEW: { name: 'abouteMe', path: '/about-me' },
  ABOUT_THIS_MONOREPO_VIEW: { name: 'aboutThisMonorepo', path: '/about-this-monorepo' },
  ACTIVITY_VIEW: { name: 'activity', path: '/activity' },
  CV_VIEW: { name: 'cv', path: '/cv' },
  // plop:inject-routes-do-not-removed
  NOT_FOUND_VIEW: { name: 'notFound', path: '/:pathMatch(.*)*' },
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
