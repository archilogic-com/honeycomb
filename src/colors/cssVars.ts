export const honeycombColorVars = {
  primary:           '--honeycomb-color-primary',
  primaryHover:      '--honeycomb-color-primary-hover',
  primaryActive:     '--honeycomb-color-primary-active',
  primarySubtle:     '--honeycomb-color-primary-subtle',
} as const

export type HoneycombColorVar = (typeof honeycombColorVars)[keyof typeof honeycombColorVars]
