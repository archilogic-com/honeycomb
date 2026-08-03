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
