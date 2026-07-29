import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeCarousel from './MoleculeCarousel.vue'

const mockCarouselSlides = [
  {
    id: 1,
    image: 'https://unsplash.com',
    title: 'Feature-Sliced Design Integration',
    description: 'Ensure runtime performance stability across distributed package workspace architecture layouts.',
  },
  {
    id: 2,
    image: 'https://unsplash.com',
    title: 'Atomic Component Architectures',
    description: 'Construct completely encapsulated atoms, molecules, and organism cells built to scale cleanly.',
  },
  {
    id: 3,
    image: 'https://unsplash.com',
    title: 'Tailwind CSS v4 Pipelines',
    description: 'Accelerate presentation layer processing and theme variable mapping graphs natively inside compiled stylesheets.',
  },
]

const meta: Meta<typeof MoleculeCarousel> = {
  title: 'Components/MoleculeCarousel',
  component: MoleculeCarousel,
  argTypes: {
    interval: { control: { type: 'number', step: 500 } },
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
  args: {
    items: mockCarouselSlides,
    autoPlay: false,
    interval: 3000,
    loop: true,
  },
}

export default meta
type Story = StoryObj<typeof MoleculeCarousel>

export const Default: Story = {}

export const AutoPlayActive: Story = {
  args: {
    autoPlay: true,
  },
}

export const RestrictedNoLoop: Story = {
  args: {
    loop: false,
  },
}

export const SingleSlideState: Story = {
  args: {
    items: [mockCarouselSlides[0]],
  },
}
