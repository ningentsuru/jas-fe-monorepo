import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [],

  css: ['@repo/ui-vue/style.css'],

  vite: {
    plugins: [tailwindcss()],
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
