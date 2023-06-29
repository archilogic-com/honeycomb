/// <reference types="vitest" />
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  build: {
    lib: {
      entry: {
        main: path.resolve(__dirname, './src/index.ts'),
        components: path.resolve(__dirname, './src/components/index.ts'),
        composables: path.resolve(__dirname, './src/composables/index.ts')
      }
    },
    rollupOptions: {
      external: ['vue', '@headlessui/vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts']
  },
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: './tsconfig.build.json'
    }),
    svgLoader({
      svgo: false
    })
  ]
})
