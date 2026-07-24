export const ROUTES = {
  HOME_VIEW: { name: 'home', path: '/' },
  HIS_CV_VIEW: { name: 'hisCv', path: '/his-cv' },
  // plop:inject-routes-do-not-removed
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
