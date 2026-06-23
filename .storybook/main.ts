import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  async viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(tailwindcss())
    return config
  }
}

export default config
