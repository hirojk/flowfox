import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '')

  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      vueDevTools(),
      quasar(),
    ],
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixin.scss" as *;
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
        '@services': path.resolve(__dirname, 'src/services'),
        '@stores': path.resolve(__dirname, 'src/stores'),
        '@typeDefs': path.resolve(__dirname, 'src/types'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@shared': fileURLToPath(new URL('../backend/shared', import.meta.url)),
      },
    },

    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
