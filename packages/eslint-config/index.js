import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export const baseParserOptions = {
  languageOptions: {
    parser: vueParser,
    parserOptions: {
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
