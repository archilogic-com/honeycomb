import '../tailwind/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
