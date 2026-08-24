import { readdirSync } from 'fs'
import { join } from 'path'
import { iconManifest, resolveIconSymbol, composeIconSymbol } from '../icons/manifest'

const ICONS_DIR = join(__dirname, '../icons')
const sizes = ['sm', 'md', 'lg', 'other', 'fp'] as const

const svgFileCount = sizes
  .map(size => readdirSync(join(ICONS_DIR, size)).filter(f => f.endsWith('.svg')).length)
  .reduce((a, b) => a + b, 0)

describe('iconManifest', () => {
  it('contains an entry for every SVG file', () => {
    expect(Object.keys(iconManifest).length).toBeGreaterThan(0)
    expect(Object.keys(iconManifest).length).toBe(svgFileCount)
  })

  it('keys are kebab-case names with a size suffix', () => {
    for (const key of Object.keys(iconManifest)) {
      expect(key).toMatch(/^[a-z0-9-]+-(sm|md|lg|other|fp)$/)
    }
  })

  it('values are raw SVG sources', () => {
    for (const svg of Object.values(iconManifest)) {
      expect(svg.trimStart()).toMatch(/^<svg/)
    }
  })

  it('keeps same-named icons from different size folders as distinct entries', () => {
    expect(iconManifest['close-sm']).toBeDefined()
    expect(iconManifest['close-md']).toBeDefined()
    expect(iconManifest['close-sm']).not.toBe(iconManifest['close-md'])
  })
})

describe('resolveIconSymbol', () => {
  it('resolves namespaced honeycomb symbol ids to raw SVG', () => {
    expect(resolveIconSymbol('hc:user-md')).toBe(iconManifest['user-md'])
  })

  it('returns undefined outside the honeycomb namespace', () => {
    expect(resolveIconSymbol('iso7010:F001')).toBeUndefined()
    // bare ids are not namespaced symbol ids
    expect(resolveIconSymbol('user-md')).toBeUndefined()
  })

  it('returns undefined for unknown icons in the namespace', () => {
    expect(resolveIconSymbol('hc:does-not-exist-md')).toBeUndefined()
  })
})

describe('composeIconSymbol', () => {
  it('composes the namespaced symbol id', () => {
    expect(composeIconSymbol('user-md')).toBe('hc:user-md')
  })

  it('round-trips through resolveIconSymbol for every icon', () => {
    for (const id of Object.keys(iconManifest) as (keyof typeof iconManifest)[]) {
      expect(resolveIconSymbol(composeIconSymbol(id))).toBe(iconManifest[id])
    }
  })
})
