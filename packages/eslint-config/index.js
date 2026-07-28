// packages/eslint-config/index.js
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export const baseParserOptions = {
  languageOptions: {
    // FIX: Tells ESLint to parse Vue template markup structures natively
    parser: vueParser,
    parserOptions: {
      // FIX: Tells the parser to process your TypeScript blocks inside <script lang="ts">
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      },
      warnOnUnsupportedTypeScriptVersion: false
    }
  }
}

export const vueConfigsFlat = pluginVue.configs['flat/essential']
export const vueTsConfigsFlat = tseslint.configs.recommended
export const prettierConfigFlat = skipFormatting
