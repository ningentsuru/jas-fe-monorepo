import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss(), vueJsx()],
    resolve: {
      alias: {
        '@repo/ui-vue/style.css': fileURLToPath(
          new URL('../../packages/ui-vue/src/style.css', import.meta.url),
        ),
      },
    },
  },
})
