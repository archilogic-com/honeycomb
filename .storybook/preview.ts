import type { Preview } from '@storybook/vue3-vite'

import '../tailwind/index.css'

const preview: Preview = {
  // SB8+ enables autodocs via a tag instead of the removed `docs.autodocs` option
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
      storySort: {
        order: ['Guide', 'Primitives', ['Spacing', 'Colors', 'Typography'], 'Components'],
        method: 'alphabetical'
      }
    }
  }
}

export default preview
