import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      // Vue structure
      'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
      'vue/block-lang': ['warn', { script: { lang: 'ts' } }],
      'vue/component-api-style': ['warn', ['script-setup']],
      'vue/prefer-define-options': 'warn',
      'vue/attributes-order': 'warn',

      // Vue formatting
      'vue/singleline-html-element-content-newline': 'off',
      'vue/script-indent': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      'no-undef': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-unused-expressions': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.turbo/**'],
  },
)
