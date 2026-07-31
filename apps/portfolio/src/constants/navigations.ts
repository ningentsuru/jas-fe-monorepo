export const NAVIGATIONS = [
  {
    label: 'About',
    to: '/about-me',
    children: [
      { label: 'Me', to: '/about-me' },
      { label: 'This Monorepo', to: '/about-this-monorepo' },
    ],
  },
  {
    label: 'Activity',
    to: '/activity',
    children: [
      { label: 'Overview', to: '/activity' },
      { label: 'Simulation', to: '/simulation' },
    ],
  },
  {
    label: 'Multi-Zones',
    children: [
      { label: 'Overview', href: '/multi-zones' },
      { label: 'Morse Code', href: '/multi-zones-morse-code' },
    ],
  },
  { label: 'CV', to: '/cv' },
] as const
