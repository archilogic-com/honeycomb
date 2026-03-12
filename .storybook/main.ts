import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/stories/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  docs: {
    autodocs: true
  },

  async viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(tailwindcss())
    return config
  }
}

export default config
