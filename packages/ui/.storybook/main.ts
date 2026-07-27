import type { StorybookConfig } from '@storybook/vue3-vite'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import federation from '@originjs/vite-plugin-federation' // 1. Import the federation plugin

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: getAbsolutePath('@storybook/vue3-vite'),

  // 2. Inject federation metadata configurations directly into the underlying Vite thread
  async viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(
      federation({
        name: 'repo_ui',
        filename: 'remoteEntry.js', // This outputs to storybook-static/assets/remoteEntry.js
        exposes: {
          './OrganismHero': './src/organisms/OrganismHero/OrganismHero.vue',
          './AtomButton': './src/atoms/AtomButton/AtomButton.vue',
        },
        shared: ['vue'],
      }),
    )

    // Force build target to esnext to maintain compatibility with modern chunks
    config.build = config.build || {}
    config.build.target = 'esnext'

    return config
  },
}

export default config
