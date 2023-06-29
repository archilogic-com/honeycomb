const { mergeConfig } = require('vite')
const svgLoader = require('vite-svg-loader')

module.exports = {
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
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  core: { builder: '@storybook/builder-vite' },
  framework: '@storybook/vue3'
}
