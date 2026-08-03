import { toCamel, toKebab } from '../icons/casing'

describe('toKebab', () => {
  it('converts PascalCase icon file names to kebab-case', () => {
    expect(toKebab('ArrowDown')).toBe('arrow-down')
    expect(toKebab('SocialLinkedin')).toBe('social-linkedin')
    expect(toKebab('SpaceAndComponent')).toBe('space-and-component')
  })

  it('keeps single-word and digit-bearing names intact', () => {
    expect(toKebab('Ai')).toBe('ai')
    expect(toKebab('Size2')).toBe('size2')
  })
})

describe('toCamel', () => {
  it('converts kebab-case icon ids to camelCase export names', () => {
    expect(toCamel('close-sm')).toBe('closeSm')
    expect(toCamel('arrow-down-md')).toBe('arrowDownMd')
    expect(toCamel('size2-sm')).toBe('size2Sm')
  })

  it('round-trips a file name through id to export name', () => {
    expect(toCamel(`${toKebab('MenuChevronRight')}-other`)).toBe('menuChevronRightOther')
  })
})
