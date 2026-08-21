/** the track a slider spans over a set of values */
export interface SliderBounds {
  min: number
  max: number
  step: number
}

export interface SliderBoundsOptions {
  /**
   * the share of the values the track has to reach; the few beyond it park at
   * its end rather than flattening everything else onto its start. Defaults to `0.98`
   */
  coverage?: number
  /**
   * roughly how many steps the track should have. Defaults to `100`
   */
  steps?: number
}

export const fallbackSliderBounds: SliderBounds = { min: 0, max: 100, step: 1 }

/** decimals to round to, so that a step of 0.1 can't drift into 0.30000000000000004 */
export const decimalsOf = (step: number) => {
  const [mantissa, exponent] = String(step).split('e-')
  const fraction = mantissa.split('.')[1]?.length ?? 0
  return Math.min(20, fraction + (exponent ? Number(exponent) : 0))
}

/** rounds a rough step up to the next 1, 2 or 5 of its decade */
const niceStep = (rough: number) => {
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const normalized = rough / magnitude
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return nice * magnitude
}

/** a track from zero to just past `largest`, stepped so that it reads in round numbers */
export const sliderBoundsUpTo = (largest: number, steps = 100): SliderBounds => {
  if (!Number.isFinite(largest) || largest <= 0) return fallbackSliderBounds
  const step = niceStep(largest / steps)
  const decimals = decimalsOf(step)
  const max = Number((Math.ceil(largest / step) * step).toFixed(decimals))
  return { min: 0, max, step: Number(step.toFixed(decimals)) }
}

/**
 * A track over the bulk of `values`, for a slider that filters records by a
 * number they carry. One outlier would otherwise stretch the track until every
 * other value sits within the first few pixels.
 */
export const sliderBoundsOver = (
  values: readonly number[],
  { coverage = 0.98, steps = 100 }: SliderBoundsOptions = {}
): SliderBounds => {
  const sorted = [...values].sort((a, b) => a - b)
  if (sorted.length === 0) return fallbackSliderBounds
  return sliderBoundsUpTo(sorted[Math.ceil(coverage * (sorted.length - 1))], steps)
}
