import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import '@repo/ui-vue'

import App from './App.vue'
import router from './router'

export const createApp = ViteSSG(
  App,
  {
    routes: router.getRoutes(),
    scrollBehavior: () => ({ top: 0 }),
  },
  ({ app, router, initialState }) => {
    const pinia = createPinia()
    if (import.meta.env.SSR) {
      initialState.pinia = pinia.state.value
    } else {
      pinia.state.value = initialState?.pinia || {}
    }

    app.use(pinia)
  },
)
