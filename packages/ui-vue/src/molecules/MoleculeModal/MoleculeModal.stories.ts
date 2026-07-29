import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import MoleculeModal from './MoleculeModal.vue'

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
  render: (args) => ({
    components: { MoleculeModal },
    setup() {
      const localShow = ref(args.show)

      watch(
        () => args.show,
        (newVal) => {
          localShow.value = newVal
        },
      )

      function handleClose() {
        localShow.value = false
      }

      return { args, localShow, handleClose }
    },
    template: `
      <div>
        <MoleculeModal v-bind="args" :show="localShow" @close="handleClose">
          <p>This is the default content area. All your modular components or forms go here securely.</p>
          <template #footer>
            <button class="px-4 py-2 border border-neutral-300 rounded-md text-sm" @click="handleClose">Cancel</button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Save Changes</button>
          </template>
        </MoleculeModal>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof MoleculeModal>

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
