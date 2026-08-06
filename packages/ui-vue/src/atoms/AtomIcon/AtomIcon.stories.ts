import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Smile } from '@lucide/vue'
import AtomIcon from './AtomIcon.vue'

const meta: Meta<typeof AtomIcon> = {
  title: 'Atoms/AtomIcon',
  component: AtomIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'text',
      description:
        'Accepts utility name string presets (sm, md, lg, xl) or exact numeric pixel values',
    },
    name: {
      control: 'text',
      description: 'The alternative fallback label used when graphical vectors are absent',
    },
    icon: {
      control: false,
      description:
        'The target graphic representation (Lucide component class reference or string URI path)',
    },
  },
  args: {
    name: 'Smile Icon',
    icon: Smile,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof AtomIcon>

export const Default: Story = {}

export const LocalSvgAssetPath: Story = {
  args: {
    icon: '/src/assets/images/svgs/vue.svg',
    name: 'Local Vue Framework Logo Link',
    size: 'lg',
  },
}

export const TextFallbackState: Story = {
  args: {
    icon: undefined,
    name: 'Fallback Text',
  },
}

export const CustomNumericSize: Story = {
  args: {
    size: 48,
  },
}
