import { mergeConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default {
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      plugins: [
        svgLoader({
          svgo: false
        })
      ]
    })
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
}
