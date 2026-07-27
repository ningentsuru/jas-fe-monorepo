import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeNavDropdown from './MoleculeNavDropdown.vue'

const mockItemWithChildren = {
  label: 'Products',
  children: [
    { label: 'Web Applications', href: '/web' },
    { label: 'Mobile Platforms', href: '/mobile' },
    { label: 'Cloud Architecture', href: '/cloud' },
  ],
}

const mockSingleItem = {
  label: 'Pricing Info',
  href: '/pricing',
}

const meta: Meta<typeof MoleculeNavDropdown> = {
  title: 'Components/MoleculeNavDropdown',
  component: MoleculeNavDropdown,
  args: {
    item: mockItemWithChildren,
    index: 2,
    isOpen: false,
  },
}

export default meta
type Story = StoryObj<typeof MoleculeNavDropdown>

export const Default: Story = {}

export const OpenedDropdown: Story = {
  args: {
    isOpen: true,
  },
}

export const SingleLinkNoDropdown: Story = {
  args: {
    item: mockSingleItem,
    index: 0,
  },
}
