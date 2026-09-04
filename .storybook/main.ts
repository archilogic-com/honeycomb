import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-docs',
      options: {
        // MDX only speaks CommonMark; tables are GFM and need the remark plugin
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    '@storybook/addon-a11y'
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  async viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter(
      plugin =>
        !(plugin && typeof plugin === 'object' && 'name' in plugin && plugin.name === 'vite:dts')
    )
    config.plugins.push(tailwindcss())
    return config
  }
}

export default config
