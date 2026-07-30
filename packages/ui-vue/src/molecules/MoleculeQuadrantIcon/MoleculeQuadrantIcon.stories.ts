import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Smile } from '@lucide/vue'
import MoleculeQuadrantIcon from './MoleculeQuadrantIcon.vue'

const meta: Meta<typeof MoleculeQuadrantIcon> = {
  title: 'Components/MoleculeQuadrantIcon',
  component: MoleculeQuadrantIcon,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 64, 128],
    },
  },
}

export default meta
type Story = StoryObj<typeof MoleculeQuadrantIcon>

export const Default: Story = {
  args: {
    icons: [Smile, '/src/assets/images/svgs/vue.svg', Smile, '/src/assets/images/svgs/react.svg'],
    shape: 'circle',
    size: 'lg',
  },
}

export const SquareLayout: Story = {
  args: {
    icons: [Smile, Smile, Smile, Smile],
    shape: 'square',
    size: 'xl',
  },
}
