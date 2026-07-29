import type { Meta, StoryObj } from '@storybook/react-vite'
import OrganismHero, { type OrganismHeroProps } from './OrganismHero'

const meta: Meta<typeof OrganismHero> = {
  title: 'Components/OrganismHero',
  component: OrganismHero,
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    ctaTarget: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
    },
    secondaryTarget: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
    },
  },
  args: {
    title: 'The Next Generation Monorepo Framework',
    subtitle: 'Build fluid, micro-frontend experiences optimized natively for Tailwind v4 theme variations.',
    ctaLabel: 'Explore Core Atoms',
    ctaHref: '#explore',
    ctaTarget: '_self',
    secondaryLabel: 'View GitHub Source',
    secondaryHref: 'https://github.com',
    secondaryTarget: '_blank',
    align: 'center',
    backgroundImage: '',
    backgroundVideo: '',
  },
}

export default meta
type Story = StoryObj<OrganismHeroProps>

export const Default: Story = {}

export const LeftAligned: Story = {
  args: {
    align: 'left',
  },
}

export const WithImageBackground: Story = {
  args: {
    backgroundImage: 'https://unsplash.com',
  },
}

export const WithVideoBackground: Story = {
  args: {
    backgroundImage: 'https://unsplash.com',
    backgroundVideo: 'https://mixkit.co',
  },
}
