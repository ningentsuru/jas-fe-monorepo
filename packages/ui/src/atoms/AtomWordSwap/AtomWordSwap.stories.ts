// packages/ui/src/atoms/AtomWordSwap/AtomWordSwap.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AtomWordSwap from './AtomWordSwap'

const meta: Meta<typeof AtomWordSwap> = {
  title: 'Components/AtomWordSwap',
  component: AtomWordSwap,
  argTypes: {
    transition: {
      control: 'select',
      options: ['fade', 'slide-up', 'slide-down', 'scale-up', 'scale-down', 'blur', 'flip'],
    },
  },
  args: {
    words: ['Innovative', 'Performant', 'Accessible', 'Scalable'],
    interval: 2000,
    transition: 'fade',
  },
}

export default meta
type Story = StoryObj<typeof AtomWordSwap>

export const Default: Story = {}

export const SlideUpTransition: Story = {
  args: {
    transition: 'slide-up',
    interval: 1500,
  },
}

export const FastFlipTransition: Story = {
  args: {
    transition: 'flip',
    interval: 1000,
  },
}

export const SingleWordFallback: Story = {
  args: {
    words: ['Static'],
  },
}
