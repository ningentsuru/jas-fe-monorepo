export const NAVIGATIONS = [
  {
    label: 'About',
    children: [
      { label: 'Me', href: '/about-me' },
      { label: 'This Monorepo', href: '/about-this-monorepo' },
    ],
  },
  { label: 'Activity', href: '/activity' },
  { label: 'His CV', href: '/his-cv' },
] as const
