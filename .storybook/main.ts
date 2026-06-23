import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}

export default config
