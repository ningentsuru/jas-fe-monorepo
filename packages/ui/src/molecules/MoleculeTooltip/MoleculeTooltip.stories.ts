import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MoleculeTooltip from './MoleculeTooltip.vue'

const meta: Meta<typeof MoleculeTooltip> = {
  title: 'Components/MoleculeTooltip',
  component: MoleculeTooltip,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    title: 'Tax Information Override',
    position: 'top',
    delay: 200,
  },
  render: (args) => ({
    components: { MoleculeTooltip },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex justify-center items-center">
        <MoleculeTooltip v-bind="args">
          <span class="text-blue-600 underline font-medium cursor-help">Hover over me</span>
          <template #content>
            <p class="max-w-xs leading-relaxed">
              This data represents calculated system thresholds pulled directly from the monorepo core layers.
            </p>
          </template>
        </MoleculeTooltip>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof MoleculeTooltip>

export const Default: Story = {}

export const PositionBottom: Story = {
  args: {
    position: 'bottom',
    title: 'Bottom Placement Tooltip',
  },
}

export const PositionLeft: Story = {
  args: {
    position: 'left',
    title: 'Left Placement Tooltip',
  },
}

export const FastDelay: Story = {
  args: {
    delay: 50,
    title: 'Fast Action Delay Tooltip',
  },
}
