const plugin = require('tailwindcss/plugin')
const colors = require('./colorMap.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,vue}', './node_modules/@archilogic/honeycomb/**/*.{js,css}'],
  theme: {
    spacing: {
      unset: 'unset',
      px: '1px',
      0: 0,
      1: '0.25rem', // 4px - special cases only
      2: '0.5rem', // 8px
      3: '0.75rem', //12px - special cases only
      4: '1rem', // 16px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      10: '2.5rem', // 40px
      12: '3rem', // 48px
      16: '4rem' // 64px
    },
    colors,
    boxShadow: {
      sm: '0px 2px 8px rgba(12, 24, 41, 0.2)',
      md: '0px 4px 20px rgba(12, 24, 41, 0.2)',
      lg: '0px 16px 50px rgba(12, 24, 41, 0.2)',
      border: 'inset 0 0 0 1px',
      none: 'none'
    },
    borderRadius: {
      none: '0',
      sm: '2px',
      md: '3px',
      DEFAULT: '3px',
      lg: '8px',
      full: '9999px'
    },
    extend: {
      minWidth: theme => theme('spacing'),
      minHeight: theme => theme('spacing'),
      cursor: {
        'col-resize': 'col-resize'
      },
      keyframes: {
        dash: {
          '0%': {
            strokeDasharray: '1, 150',
            strokeDashoffset: 0
          },
          '50%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-35px'
          },
          '100%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-120px'
          }
        },
        shimmer: {
          '33%, 100%': {
            transform: 'translateX(100%)'
          }
        }
      },
      animation: {
        spin: 'spin 2s linear infinite',
        dash: 'dash 1.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  },
  plugins: [
    require('./typography.cjs'),
    plugin(function ({ addUtilities, addComponents, theme }) {
      addUtilities({
        '.border-spacing-0': {
          'border-spacing': 0
        },
        '.focus-shadow': {
          outline: 'none',
          'box-shadow': `inset 0 0 0 2px ${theme('colors.blueribbon')}`
        },
        '.focus-outline': {
          outline: `2px solid ${theme('colors.blueribbon')}`,
          'outline-offset': '-2px'
        },
        '.focus-border': {
          outline: 'none',
          border: `2px solid ${theme('colors.blueribbon')}`
        },
        '.focus-none': {
          outline: 'none',
          'box-shadow': 'none'
        },
        '.grid-area-cover': {
          'grid-area': '1 / 1 / 2 / 2'
        },
        '.break-anywhere': {
          'overflow-wrap': 'anywhere'
        }
      })

      addComponents({
        '.a-panel-sm': {
          '@apply bg-white shadow-md rounded-sm': {}
        },
        '.a-panel-lg': {
          '@apply bg-white shadow-lg rounded': {}
        },
        '.a-menu-panel': {
          '@apply a-panel-sm min-w-min sm:min-w-[14rem] py-2': {},
          'max-height': 'calc(100vh - 16px)'
        },
        '.a-text-input-base': {
          '@apply w-full rounded-sm border p-2 text-newyork': {}
        },
        '.a-text-input-hover': {
          '&:not(:disabled):not(:focus-within)': {
            '@apply bg-athens': {}
          }
        },
        '.a-text-input-focus': {
          '@apply border-blueribbon bg-white shadow-border shadow-blueribbon outline-none hover:bg-white': {}
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
        '.a-text-input--md': {
          '@apply h-10 body-lg placeholder:body-lg': {}
        },
        '.a-text-input--sm': {
          // for size 'sm' 30px height + 1px vertical margin = 2rem/32px
          '@apply h-[1.875rem] my-px body-sm placeholder:body-sm': {}
        },
        '.a-text-input--default': {
          '@apply border-gray bg-whisper': {},
          '&:disabled': {
            '@apply border-athens': {}
          }
        },
        '.a-text-input--subtle': {
          '@apply border-transparent bg-transparent': {}
        },
        '.a-text-input--invalid': {
          '@apply bg-transparent border-error shadow-border shadow-error': {}
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
  ]
}
