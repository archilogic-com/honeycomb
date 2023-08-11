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
        'components/index': path.resolve(__dirname, './src/components/index.ts'),
        'composables/index': path.resolve(__dirname, './src/composables/index.ts'),
        'colors/index': path.resolve(__dirname, './src/colors/index.ts')
      }
    },
    rollupOptions: {
      external: ['vue', '@headlessui/vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
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
      tsconfigPath: './tsconfig.build.json'
    }),
    svgLoader({
      svgo: false
    })
  ]
})
