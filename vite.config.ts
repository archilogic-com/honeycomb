/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`
    }
  },
  build: {
    lib: {
      entry: {
        main: './src/index.ts',
        'components/index': './src/components/index.ts',
        'composables/index': './src/composables/index.ts',
        'colors/index': './src/colors/index.ts'
      },
      cssFileName: 'style'
    },
    rolldownOptions: {
      external: ['vue', '@headlessui/vue', '@floating-ui/vue', '@vueuse/core', 'tabbable'],
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
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json'
    }),
    svgLoader({
      svgo: false
    })
  ]
})
