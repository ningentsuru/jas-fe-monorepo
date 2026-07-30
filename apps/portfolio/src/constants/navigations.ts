export const NAVIGATIONS = [
  {
    label: 'About',
    children: [
      { label: 'Me', href: '/about-me' },
      { label: 'This Monorepo', href: '/about-this-monorepo' },
    ],
  },
  { label: 'Activity', href: '/activity' },
  { label: 'CV', href: '/cv' },
] as const
