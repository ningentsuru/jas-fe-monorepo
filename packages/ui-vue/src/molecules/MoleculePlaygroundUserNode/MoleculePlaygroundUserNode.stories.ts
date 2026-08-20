import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculePlaygroundUserNode from './MoleculePlaygroundUserNode.vue'

/**
 * 1. GLOBAL STORYBOOK METADATA
 * -----------------------------------------------------------------------------
 * Configures component placement and controls mapping.
 * Storybook v10+ automatically discovers and wires up actions for defineModel changes.
 */
const meta: Meta<typeof MoleculePlaygroundUserNode> = {
  component: MoleculePlaygroundUserNode,
  title: 'Components/MoleculePlaygroundUserNode',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MoleculePlaygroundUserNode>

/**
 * 2. STRUCTURAL STORIES (COMPONENT VARIATIONS)
 * -----------------------------------------------------------------------------
 * Organized configuration arguments. Storybook maps these keys directly to 
 * the corresponding standard props and two-way named v-models.
 */
export const Default: Story = {
  args: {
    // === A. STANDARD LAYOUT PROPS INITIAL STATE ===
    title: '',

    // === B. TWOWAY DEFINE_MODEL PROXY CONTROLS INITIAL STATE ===
  },
}
