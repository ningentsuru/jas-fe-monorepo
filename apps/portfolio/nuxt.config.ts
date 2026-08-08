import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

function localFile(location: string) {
  return fileURLToPath(new URL(location, import.meta.url))
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '-theme',
    fallback: 'light',
    preference: 'system',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },

  css: ['@/assets/css/main.css'],

  alias: {
    '#entities': localFile('./app/entities'),
    '#features': localFile('./app/features'),
    '#shared': localFile('./shared'),
    '#ui': localFile('../../packages/ui-vue/src'),
    '#widgets': localFile('./app/widgets'),
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

  build: {
    // ❌ Try removing this line first.
    // Your alias points to source code, which Vite transpiles automatically.
    // transpile: ['@repo/ui-vue'],
    // ✅ ONLY add specific dependencies if you encounter ESM errors:
    // transpile: ['reka-ui', 'vee-validate'],
  },

  runtimeConfig: {
    formspreeEndpointId: '',
    groqApiKey: '',
    openaiApiKey: '',
  },
})
