/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

const browserTestGlob = '**/__browser_tests__/**/*.browser.test.ts'

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
        components: './src/components/index.ts',
        composables: './src/composables/index.ts',
        colors: './src/colors/index.ts',
        icons: './src/components/icons/manifest.ts',
        'icons-individual': './src/components/icons/individual.ts'
      },
      formats: ['es'],
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
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: ['vitest.setup.ts'],
          exclude: [...configDefaults.exclude, browserTestGlob]
        }
      },
      {
        // Real browsers, so none of the jsdom shims in vitest.setup.ts apply:
        // IntersectionObserver, layout, focus and pointer semantics are the
        // browser's own. This is what makes the WebKit run meaningful.
        extends: true,
        test: {
          name: 'browser',
          globals: true,
          include: [browserTestGlob],
          setupFiles: ['vitest.browser.setup.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }, { browser: 'webkit' }]
          }
        }
      }
    ]
  },
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true
    }),
    svgLoader({
      svgo: false
    })
  ]
})
