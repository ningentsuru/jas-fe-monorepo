import type { Meta, StoryObj } from '@storybook/react-vite'
import AtomAvatar, { type AtomAvatarProps } from './AtomAvatar'

const meta: Meta<typeof AtomAvatar> = {
  title: 'Components/AtomAvatar',
  component: AtomAvatar,
  argTypes: {
    size: {
      type: { name: 'other', value: 'string | number' },
      description: 'Accepts preset name strings (sm, md, lg) or a custom number value',
    },
  },
  args: {
    username: 'John Doe',
    size: 'md',
    round: true,
  },
}

export default meta
type Story = StoryObj<AtomAvatarProps>

export const Default: Story = {}

export const Squared: Story = {
  args: {
    round: false,
  },
}

export const CustomNumericSize: Story = {
  args: {
    username: 'JD',
    size: 75,
  },
}
