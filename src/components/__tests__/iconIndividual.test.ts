import * as individual from '../icons/individual'
import { iconManifest } from '../icons/manifest'

import { toCamel } from '../icons/casing'

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
