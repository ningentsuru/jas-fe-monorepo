import type { Meta, StoryObj } from '@storybook/react-vite'
import MoleculeForm from './MoleculeForm'

/**
 * 1. STORYBOOK GLOBAL METADATA
 * -----------------------------------------------------------------------------
 * Maps out controls panels and logs functional events into the telemetry panel.
 */
const meta: Meta<typeof MoleculeForm> = {
  component: MoleculeForm,
  title: 'Components/MoleculeForm',
  tags: ['autodocs'],
  argTypes: {
    onUpdateName: { action: 'onUpdateName captured' },
    onUpdateAge: { action: 'onUpdateAge captured' },
  },
}

export default meta
type Story = StoryObj<typeof MoleculeForm>

/**
 * 2. CANVAS PLAYGROUND DECLARATIONS
 * -----------------------------------------------------------------------------
 */
export const Default: Story = {
  args: {
    // === A. STANDARD LAYOUT PROPS INITIAL STATE ===
    title: '',

    // === B. CONTROLLED INPUT VALUES INITIAL STATE ===
    name: '',
    age: 0,
  },
}
