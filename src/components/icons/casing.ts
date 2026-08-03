// Runtime mirrors of the type-level KebabCase in types.ts: converting between
// icon file names ('ArrowDown'), icon ids ('arrow-down-sm') and their
// camelCase export names ('arrowDownSm').

export const toKebab = (name: string): string =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export const toCamel = (kebab: string): string =>
  kebab.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase())
