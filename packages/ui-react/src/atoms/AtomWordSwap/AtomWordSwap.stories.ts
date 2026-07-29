import type { Meta, StoryObj } from '@storybook/react-vite'
import AtomWordSwap, { type AtomWordSwapProps } from './AtomWordSwap'

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
type Story = StoryObj<AtomWordSwapProps>

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
