import plugin from 'tailwindcss/plugin'

export default plugin(function ({ addComponents, theme }) {
  addComponents({
    '.a-text-input-hover': {
      '&:not(:disabled):not(:focus-within)': {
        '@apply bg-athens': {}
      }
    },
    '.a-text-input-placeholder': {
      '@apply text-warsaw': {},
      '-webkit-text-fill-color': theme('colors.warsaw')
    },
    '.a-text-input-disabled': {
      '@apply text-stone cursor-not-allowed': {},
      '-webkit-text-fill-color': theme('colors.stone'),
      '&::placeholder': {
        '@apply a-text-input-placeholder': {}
      }
    },
    '.a-text-input': {
      '@apply a-text-input-base': {},
      '&::placeholder': {
        '@apply a-text-input-placeholder': {}
      },
      '&:hover': {
        '@apply a-text-input-hover': {}
      },
      '&:focus': {
        '@apply a-text-input-focus': {}
      },
      '&:disabled': {
        '@apply a-text-input-disabled': {}
      }
    },
    '.a-text-input--default': {
      '&:disabled': {
        '@apply border-athens': {}
      }
    },
    '.a-number-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: '0'
      },
      '-moz-appearance': 'textfield'
    }
  })
})
