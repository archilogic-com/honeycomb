/* eslint-disable */
const plugin = require('tailwindcss/plugin')

function createBaseStyles({ addBase }) {
  addBase({
    '::selection': {
      '@apply bg-zurich48': {}
    },
    body: {
      '@apply text-navy body-md bg-whisper': {}
    },
    hr: {
      '@apply block shrink-0 border-0 bg-gray p-0 h-px': {}
    }
  })
}

module.exports = plugin(createBaseStyles)
