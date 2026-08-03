import * as individual from '../icons/individual'
import { iconManifest } from '../icons/manifest'

const toCamel = (kebab: string) => kebab.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())

describe('individual icon exports', () => {
  it('exports every manifest entry under its camelCased id', () => {
    const manifestIds = Object.keys(iconManifest)
    expect(Object.keys(individual)).toHaveLength(manifestIds.length)
    for (const id of manifestIds) {
      expect(individual).toHaveProperty(toCamel(id))
    }
  })

  it('exports the same raw SVG source as the manifest', () => {
    expect(individual.userMd).toBe(iconManifest['user-md'])
    expect(individual.closeSm).toBe(iconManifest['close-sm'])
    expect(individual.userMd.trimStart()).toMatch(/^<svg/)
  })
})
