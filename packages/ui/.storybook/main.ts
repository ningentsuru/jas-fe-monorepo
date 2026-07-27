import type { StorybookConfig } from '@storybook/vue3-vite'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import federation from '@originjs/vite-plugin-federation'

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: getAbsolutePath('@storybook/vue3-vite'),

  async viteFinal(config) {
    config.build = config.build || {}
    config.build.rollupOptions = {
      ...config.build.rollupOptions,
      output: {
        ...config.build.rollupOptions?.output,
        inlineDynamicImports: false,
      },
    }
    return config
  },
}

export default config
