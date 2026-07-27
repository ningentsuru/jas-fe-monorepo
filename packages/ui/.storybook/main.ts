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
    config.plugins = config.plugins || []
    config.plugins.push(
      federation({
        name: 'repo_ui',
        filename: 'remoteEntry.js',
        exposes: {
          './OrganismHero': './src/organisms/OrganismHero/OrganismHero.vue',
          './AtomButton': './src/atoms/AtomButton/AtomButton.vue',
        },
        shared: ['vue'],
      }),
    )

    config.build = config.build || {}
    config.build.target = 'esnext'
    config.build.assetsDir = 'assets'

    return config
  },
}

export default config
