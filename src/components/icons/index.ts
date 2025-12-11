import { Component } from 'vue'
import { type IconSize } from './types'
export type { IconSize } from './types'

const iconModules: Record<string, { default: Component }> = import.meta.glob('./**/*.svg', {
  eager: true
})

const iconsMap: Record<IconSize, { [index: string]: object }> = {
  sm: {},
  md: {},
  lg: {},
  other: {}
}
for (const path in iconModules) {
  const [, size, name] = path.split('.')[1].split('/')
  const iconSize = size as IconSize
  iconsMap[iconSize][name] = iconModules[path].default
}

export default iconsMap

export const DEPRECATED_ICONS: { [key in IconSize]: string[] } = {
  other: [],
  sm: [],
  md: [],
  lg: []
}
