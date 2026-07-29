import type { Meta, StoryObj } from '@storybook/react-vite'
import MoleculeModal, { type MoleculeModalProps } from './MoleculeModal'

const meta: Meta<typeof MoleculeModal> = {
  title: 'Components/MoleculeModal',
  component: MoleculeModal,
  argTypes: {
    show: { control: 'boolean' },
    hideClose: { control: 'boolean' },
  },
  args: {
    title: 'Account Settings Override',
    show: true,
    hideClose: false,
  },
}

export default meta
type Story = StoryObj<MoleculeModalProps>

export const Default: Story = {}

export const HiddenModal: Story = {
  args: {
    show: false,
  },
}

export const WithoutCloseButton: Story = {
  args: {
    hideClose: true,
    title: 'Mandatory Policy Agreement',
  },
}
