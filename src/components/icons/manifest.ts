import { type IconIdentifier, type IconSize } from './types'
export type { IconIdentifier, IconSize, SmIconId, MdIconId, LgIconId, OtherIconId } from './types'

const rawModules: Record<string, string> = import.meta.glob('./**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
})

const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const iconManifest = {} as Record<IconIdentifier, string>
for (const path in rawModules) {
  const [, size, name] = path.split('.')[1].split('/')
  iconManifest[`${toKebab(name)}-${size as IconSize}` as IconIdentifier] = rawModules[path]
}
