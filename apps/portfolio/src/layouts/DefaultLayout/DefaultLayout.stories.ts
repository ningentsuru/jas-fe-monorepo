import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'

const dummyRouter = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

const meta: Meta<typeof DefaultLayout> = {
  title: 'Layouts/DefaultLayout',
  component: DefaultLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (story) => ({
      components: { story },
      plugins: [dummyRouter],
      template: '<story />',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof DefaultLayout>

export const Default: Story = {
  render: (args) => ({
    components: { DefaultLayout },
    setup() {
      return { args }
    },
    template: `
      <div v-bind="args">
        <div class="py-12 text-center border-4 border-dashed border-muted rounded-xl bg-muted/20">
          <h2 class="text-2xl font-bold">Workspace View Slot Content</h2>
          <p class="text-muted-foreground mt-2">Your routed views render right here.</p>
        </div>
      </div>
    `,
  }),
}
