import {
  baseParserOptions,
  vueConfigsFlat,
  vueTsConfigsFlat,
  prettierConfigFlat,
} from '@repo/eslint-config'

export default [
  {
    ignores: [
      '**/*.mjs',
      '**/*.js',
      '**/*.config.*',
      '.storybook/**',
      'dist/**',
      'node_modules/**',
    ],
  },

  {
    name: 'ui/files-to-lint',
    files: ['src/**/*.{vue,ts,mts,tsx,jsx}'],
    ...baseParserOptions,
  },

  ...vueConfigsFlat.map((config) => ({
    ...config,
    files: ['src/**/*.vue'],
  })),

  ...vueTsConfigsFlat.map((config) => ({
    ...config,
    files: ['src/**/*.{ts,tsx}'],
  })),

  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  prettierConfigFlat,
]
