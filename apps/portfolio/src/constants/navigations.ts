export const NAVIGATIONS = [
  {
    label: 'About',
    children: [
      { label: 'Me', href: '/about-me' },
      { label: 'This Monorepo', href: '/about-this-monorepo' },
    ],
  },
  {
    label: 'Activity',
    children: [
      { label: 'Activity', href: '/activity' },
      { label: 'Morse Code (Multi-Zones)', href: '/activity-morse-code' },
    ],
  },
  { label: 'CV', href: '/cv' },
] as const
