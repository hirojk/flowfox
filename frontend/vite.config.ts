import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    quasar()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixin.scss" as *;
        `
      }
    }
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
    },
  },
})
