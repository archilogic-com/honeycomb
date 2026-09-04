import { fallbackSliderBounds, sliderBoundsOver, sliderBoundsUpTo } from '../sliderBounds'

describe('sliderBoundsUpTo', () => {
  it('falls back to a unit track when there is nothing to span', () => {
    expect(sliderBoundsUpTo(0)).toBe(fallbackSliderBounds)
    expect(sliderBoundsUpTo(-4)).toBe(fallbackSliderBounds)
    expect(sliderBoundsUpTo(Number.NaN)).toBe(fallbackSliderBounds)
  })

  it('steps the track in round numbers and ends it just past the largest value', () => {
    expect(sliderBoundsUpTo(350)).toEqual({ min: 0, max: 350, step: 5 })
    expect(sliderBoundsUpTo(347)).toEqual({ min: 0, max: 350, step: 5 })
    expect(sliderBoundsUpTo(25)).toEqual({ min: 0, max: 25, step: 0.5 })
    expect(sliderBoundsUpTo(3767.4)).toEqual({ min: 0, max: 3800, step: 50 })
  })

  it('keeps fractional steps free of floating point drift', () => {
    expect(sliderBoundsUpTo(3.2)).toEqual({ min: 0, max: 3.2, step: 0.05 })
    expect(sliderBoundsUpTo(0.9)).toEqual({ min: 0, max: 0.9, step: 0.01 })
    expect(sliderBoundsUpTo(2.37)).toEqual({ min: 0, max: 2.4, step: 0.05 })
  })

  it('takes the number of steps the track should have', () => {
    expect(sliderBoundsUpTo(350, 10)).toEqual({ min: 0, max: 350, step: 50 })
  })
})

describe('sliderBoundsOver', () => {
  it('spans the bulk of a set, letting a lone outlier park beyond the track end', () => {
    expect(sliderBoundsOver([])).toBe(fallbackSliderBounds)
    expect(sliderBoundsOver([4.13, 3])).toEqual({ min: 0, max: 4.15, step: 0.05 })
    const widths = [...Array.from({ length: 99 }, (_, index) => 0.4 + index * 0.02), 58]
    expect(sliderBoundsOver(widths)).toEqual({ min: 0, max: 2.4, step: 0.05 })
  })

  it('reaches every value when asked for full coverage', () => {
    const widths = [...Array.from({ length: 99 }, (_, index) => 0.4 + index * 0.02), 58]
    expect(sliderBoundsOver(widths, { coverage: 1 })).toEqual({ min: 0, max: 58, step: 1 })
  })
})
