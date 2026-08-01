import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(dirname(fileURLToPath(import.meta.url)), '../src'),
        },
      },
    }
  },
}

export default config
