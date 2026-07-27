import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeNavAccordion from './MoleculeNavAccordion.vue'

const mockItemWithChildren = {
  label: 'Engineering Space',
  children: [
    { label: 'Component Atoms', href: '/atoms' },
    { label: 'Molecules Matrix', href: '/molecules' },
    { label: 'Organisms Core', href: '/organisms' },
  ],
}

const mockSingleLinkItem = {
  label: 'System Dashboard',
  href: '/dashboard',
}

const meta: Meta<typeof MoleculeNavAccordion> = {
  title: 'Components/MoleculeNavAccordion',
  component: MoleculeNavAccordion,
  args: {
    item: mockItemWithChildren,
    isOpen: false,
  },
}

export default meta
type Story = StoryObj<typeof MoleculeNavAccordion>

export const Default: Story = {}

export const ExpandedDropdown: Story = {
  args: {
    isOpen: true,
  },
}

export const SingleLinkNoChildren: Story = {
  args: {
    item: mockSingleLinkItem,
    isOpen: false,
  },
}
