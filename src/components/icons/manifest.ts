import { type IconIdentifier, type IconSize } from './types'
import { toKebab } from './casing'
export type { IconIdentifier, IconSize, SmIconId, MdIconId, LgIconId, OtherIconId } from './types'

const rawModules: Record<string, string> = import.meta.glob('./**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
})

export const iconManifest = {} as Record<IconIdentifier, string>
for (const path in rawModules) {
  const [, size, name] = path.split('.')[1].split('/')
  iconManifest[`${toKebab(name)}-${size as IconSize}` as IconIdentifier] = rawModules[path]
}

/**
 * Namespace prefix under which honeycomb icons are addressed in namespaced
 * symbol ids (e.g. persisted floor-plan label icons): 'honeycomb:user-md'.
 */
export const HONEYCOMB_ICON_NAMESPACE = 'honeycomb:'

/**
 * Resolves a namespaced symbol id ('honeycomb:user-md') to its raw SVG
 * source. Ids outside the honeycomb namespace and unknown icons resolve to
 * undefined.
 */
export function resolveSymbolSvg(symbolId: string): string | undefined {
  if (!symbolId.startsWith(HONEYCOMB_ICON_NAMESPACE)) return undefined
  return (iconManifest as Record<string, string>)[symbolId.slice(HONEYCOMB_ICON_NAMESPACE.length)]
}
