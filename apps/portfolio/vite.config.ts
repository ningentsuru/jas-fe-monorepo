import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation' // 1. Import the federation plugin

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    // 2. Connect to your live, deployed Storybook assets on Vercel
    federation({
      name: 'portfolio_host',
      remotes: {
        repo_ui_remote: 'https://jas-storybook.vercel.app/',
      },
      shared: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@repo/ui': resolve(fileURLToPath(new URL('./', import.meta.url)), '../../packages/ui/src'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  server: {
    host: '0.0.0.0',
  },
  // 3. Set build configuration to align with the remote provider target
  build: {
    target: 'esnext',
  },
})
