export const NAVIGATIONS = [
  {
    label: 'About',
    href: '/about-me',
    children: [
      { label: 'Me', href: '/about-me' },
      { label: 'This Monorepo', href: '/about-this-monorepo' },
    ],
  },
  {
    label: 'Activity',
    href: '/activity',
    children: [
      { label: 'Overview', href: '/activity' },
      { label: 'Simulation', href: '/simulation' },
    ],
  },
  {
    label: 'Multi-Zones',
    children: [
      { label: 'Overview', href: '/multi-zones' },
      { label: 'Morse Code', to: '/multi-zones-morse-code' },
    ],
  },
  { label: 'CV', href: '/cv' },
] as const
