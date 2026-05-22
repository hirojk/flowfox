import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      'no-undef': 'off',
      'no-unused-expressions': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
)
