import colorMap from './colorMap.json'

export type Color = keyof typeof colorMap

export { colorMap }
export { honeycombColorVars } from './cssVars'
export type { HoneycombColorVar } from './cssVars'
