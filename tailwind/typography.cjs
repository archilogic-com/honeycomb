/* eslint-disable */
const plugin = require('tailwindcss/plugin')

function createTypographyUtilities({ addUtilities }) {
  const baseBodyStyles = {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal'
  }

  const bodyXsStyles = {
    ...baseBodyStyles,
    fontSize: '11px',
    lineHeight: '16px',
    letterSpacing: '0.0025em'
  }
  const bodySmStyles = {
    ...baseBodyStyles,
    fontSize: '12px',
    lineHeight: '16px'
  }

  const bodyMdStyles = {
    ...baseBodyStyles,
    fontSize: '13px',
    lineHeight: '24px',
    letterSpacing: '0.0025em'
  }

  const bodyLgStyles = {
    ...baseBodyStyles,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '-0.0025em;'
  }

  const bodyStyles = {
    '.body-xs': {
      ...bodyXsStyles
    },
    '.body-xs-400': {
      ...bodyXsStyles
    },
    '.body-xs-500': {
      ...bodyXsStyles,
      fontWeight: '500'
    },
    '.body-xs-600': {
      ...bodyXsStyles,
      fontWeight: '600'
    },
    '.body-sm': {
      ...bodySmStyles
    },
    '.body-sm-400': {
      ...bodySmStyles
    },
    '.body-sm-500': {
      ...bodySmStyles,
      fontWeight: '500'
    },
    '.body-sm-600': {
      ...bodySmStyles,
      fontWeight: '600'
    },
    '.body-md': {
      ...bodyMdStyles
    },
    '.body-md-400': {
      ...bodyMdStyles
    },
    '.body-md-500': {
      ...bodyMdStyles,
      fontWeight: '500'
    },
    '.body-md-600': {
      ...bodyMdStyles,
      fontWeight: '600'
    },
    '.body-lg': {
      ...bodyLgStyles
    },
    '.body-lg-400': {
      ...bodyLgStyles
    },
    '.body-lg-500': {
      ...bodyLgStyles,
      fontWeight: '500'
    },
    '.body-lg-600': {
      ...bodyLgStyles,
      fontWeight: '600'
    }
  }

  const headingStyles = {
    '.heading-xl': {
      ...baseBodyStyles,
      fontWeight: '500',
      fontSize: '42px',
      lineHeight: '56px',
      letterSpacing: '-0.01em'
    },
    '.heading-lg': {
      ...baseBodyStyles,
      fontWeight: '500',
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '-0.0075em'
    },
    '.heading-md': {
      ...baseBodyStyles,
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.005em'
    },
    '.heading-sm': {
      ...baseBodyStyles,
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '32px',
      letterSpacing: '-0.005em'
    },
    '.heading-xs': {
      ...baseBodyStyles,
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '-0.0025em'
    },
    '.heading-xxs': {
      ...baseBodyStyles,
      fontWeight: '600',
      fontSize: '13px',
      lineHeight: '24px',
      letterSpacing: '-0.0025em'
    }
  }

  const codeStyles = {
    '.code': {
      fontFamily: 'JetBrains Mono',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '24px'
    }
  }

  addUtilities({ ...bodyStyles, ...headingStyles, ...codeStyles })
}

module.exports = plugin(createTypographyUtilities)
