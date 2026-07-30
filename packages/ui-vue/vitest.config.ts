import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, 'e2e/**', 'node_modules/**', 'dist/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    setupFiles: [fileURLToPath(new URL('./src/setup.ts', import.meta.url))],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
