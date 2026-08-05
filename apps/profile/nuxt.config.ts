import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const uiVueSrc = fileURLToPath(new URL('../../packages/ui-vue/src', import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '-theme',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },

  css: ['@/assets/css/main.css'],

  alias: {
    '@repo/ui-vue': uiVueSrc,
    '#': uiVueSrc,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@repo/ui-vue/style.css': fileURLToPath(
          new URL('../../packages/ui-vue/src/style.css', import.meta.url),
        ),
      },
    },
  },

  components: [
    { path: '~/widgets', pathPrefix: false },
    { path: '~/features', pathPrefix: false },
    { path: '~/entities', pathPrefix: false },
  ],

  build: {
    transpile: ['@repo/ui-vue'],
  },
})
