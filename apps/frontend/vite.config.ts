import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'
import { buildScssTokens } from './src/utils/tokenBuilder'
import designTokens from './src/styles/tokens.json'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const scssTokens = buildScssTokens(designTokens)

// should be removed in the future
import colors from './src/styles/colors.json'
const scssColorVariables = Object.entries(colors)
  .map(([key, value]) => `$${key}: ${value};`)
  .join('\n')

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../..'), '')

  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      vueDevTools(),
      quasar(),
    ],
    build: {
      outDir: './dist',
      emptyOutDir: true,
    },
    define: {
      'import.meta.env.STAGE_PASS': JSON.stringify(env.STAGE_PASS),
      'import.meta.env.API_URL': JSON.stringify(env.API_URL),
      'import.meta.env.APP_ENV': JSON.stringify(env.APP_ENV),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            ${scssColorVariables}
            ${scssTokens}
            @import "@/styles/variables.scss";
            @import "@/styles/mixin.scss";
            @import "@/styles/themes.scss";
            @import "@/styles/animations.scss";
          `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': path.resolve(__dirname, 'src/components'),
        '@composables': path.resolve(__dirname, 'src/composables'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@stores': path.resolve(__dirname, 'src/stores'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@typeDefs': path.resolve(__dirname, 'src/types'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
