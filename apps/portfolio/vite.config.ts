import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import generateSitemap from 'vite-ssg-sitemap'

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@repo/ui-vue': resolve(
        fileURLToPath(new URL('./', import.meta.url)),
        '../../packages/ui-vue/src',
      ),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.json', '.vue'],
  },
  server: {
    host: '0.0.0.0',
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',

    onFinished() {
      generateSitemap({
        hostname: 'https://jas-fawn.vercel.app/',
        outDir: resolve(fileURLToPath(new URL('./', import.meta.url)), 'dist'),
        exclude: ['/not-found', '/login', '/signup', '/:pathMatch(.*)*'],
        robots: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      })
    },
  },
} as UserConfig)
