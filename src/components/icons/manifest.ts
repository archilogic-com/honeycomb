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

/** A honeycomb icon addressed as a namespaced symbol id, e.g. 'honeycomb:user-md' */
export type HoneycombIconSymbol = `${typeof HONEYCOMB_ICON_NAMESPACE}${IconIdentifier}`

/**
 * Resolves a namespaced symbol id ('honeycomb:user-md') to its raw SVG
 * source. Ids outside the honeycomb namespace and unknown icons resolve to
 * undefined.
 */
export function resolveIconSymbol(symbolId: string): string | undefined {
  if (!symbolId.startsWith(HONEYCOMB_ICON_NAMESPACE)) return undefined
  return (iconManifest as Record<string, string>)[symbolId.slice(HONEYCOMB_ICON_NAMESPACE.length)]
}

/**
 * Composes the namespaced symbol id for an icon — the inverse of
 * resolveIconSymbol, for writing symbols (e.g. into persisted floor-plan label
 * icons). Typed against IconIdentifier, so unknown ids fail to compile.
 */
export function composeIconSymbol(id: IconIdentifier): HoneycombIconSymbol {
  return `${HONEYCOMB_ICON_NAMESPACE}${id}`
}
