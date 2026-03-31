import { fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

const baseConfig = typeof viteConfig === 'function' ? viteConfig({ mode: 'test', command: 'serve' }) : viteConfig

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
