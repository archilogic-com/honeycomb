<script lang="ts">
/** a single thumb's value; `undefined` means that side is open-ended (see the `openEnded` prop) */
export type SliderThumbValue = number | undefined

/** an array turns the slider into a dual-thumb range; `'mixed'` is the indeterminate state */
export type SliderModelValue =
  | SliderThumbValue
  | [SliderThumbValue, SliderThumbValue]
  | typeof MIXED

/** which point on the track the fill grows out of */
export type SliderOrigin = 'start' | 'center' | 'end'

/** what happens when one thumb is dragged into the other */
export type SliderThumbCollision = 'push' | 'swap' | 'none'

export interface SliderMark {
  value: number
  label?: string
}

export const MIXED = 'mixed'
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { decimalsOf } from '../composables/sliderBounds'

const props = withDefaults(
  defineProps<{
    /**
     * a number for a single thumb, a `[from, to]` tuple for a range, or `'mixed'`
     * when the values behind the control differ, for example in a multi-selection
     */
    modelValue: SliderModelValue
    /**
     * lowest draggable value
     */
    min?: number
    /**
     * highest draggable value
     */
    max?: number
    /**
     * lowest value the `#input` slot may accept, when typing should reach past `min`.
     * Defaults to `min`
     */
    hardMin?: number
    /**
     * highest value the `#input` slot may accept, when typing should reach past `max`.
     * Defaults to `max`
     */
    hardMax?: number
    /**
     * lets a thumb resting against its outer end mean "no limit" and emit `undefined`.
     * The lower thumb opens at `min`, every other thumb opens at `max`
     */
    openEnded?: boolean
    /**
     * granularity of every value the slider produces
     */
    step?: number
    /**
     * step used while holding Shift, and for PageUp/PageDown. Defaults to ten steps
     */
    bigStep?: number
    /**
     * step used while holding Shift + Alt
     */
    smallStep?: number
    /**
     * how many steps must stay between the two thumbs of a range
     */
    minStepsBetweenThumbs?: number
    /**
     * what a thumb does when dragged into the other one
     */
    thumbCollision?: SliderThumbCollision
    /**
     * whether clicking the track jumps the nearest thumb there.
     * Defaults to `true` for a single thumb and `false` for a range, where the
     * intended thumb can't be inferred from the click alone
     */
    allowTrackClick?: boolean
    /**
     * the point the fill grows out of. Use `'center'` for values that represent an
     * offset in either direction, like a bearing from -180 to 180
     */
    origin?: SliderOrigin
    /**
     * positions to mark on the track, each optionally labelled
     */
    marks?: SliderMark[]
    /**
     * turns a value into display text, for mark labels and screen readers.
     * Receives `undefined` for an open-ended thumb, so it can render it as `"100+"` for example
     */
    formatValue?: (value: SliderThumbValue, index: number) => string
    /**
     * accessible name per thumb. A range defaults to `['Minimum', 'Maximum']`
     */
    thumbLabels?: string[]
    /**
     * whether the slider is in an invalid state
     */
    invalid?: boolean
    /**
     * whether the slider can be interacted with
     */
    disabled?: boolean
  }>(),
  {
    min: 0,
    max: 100,
    hardMin: undefined,
    hardMax: undefined,
    step: 1,
    bigStep: undefined,
    smallStep: undefined,
    minStepsBetweenThumbs: 0,
    thumbCollision: 'push',
    allowTrackClick: undefined,
    origin: 'start',
    marks: undefined,
    formatValue: undefined,
    thumbLabels: undefined
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: SliderModelValue]
  change: [value: SliderModelValue]
}>()

defineOptions({ name: 'ASlider', inheritAttrs: false })

const trackRef = ref<HTMLElement | null>(null)
const thumbRefs = ref<(HTMLElement | null)[]>([])
const activeIndex = ref<number | null>(null)
// boxed so that an open-ended `undefined` value still reads as "there is a pending change"
const uncommitted = ref<{ model: SliderModelValue } | undefined>()

const isMixed = computed(() => props.modelValue === MIXED)
const isDual = computed(() => Array.isArray(props.modelValue))

const values = computed<SliderThumbValue[]>(() => {
  if (isMixed.value) return [undefined]
  if (Array.isArray(props.modelValue)) return [props.modelValue[0], props.modelValue[1]]
  return [props.modelValue as SliderThumbValue]
})

const span = computed(() => props.max - props.min || 1)
const minGap = computed(() => props.minStepsBetweenThumbs * props.step)
const bigStep = computed(() => props.bigStep ?? props.step * 10)
const inputMin = computed(() => props.hardMin ?? props.min)
const inputMax = computed(() => props.hardMax ?? props.max)
const isTrackClickable = computed(() => props.allowTrackClick ?? !isDual.value)

const originFraction = computed(() => {
  if (props.origin === 'center') return 0.5
  return props.origin === 'end' ? 1 : 0
})

const clampToTrack = (value: number) => Math.min(props.max, Math.max(props.min, value))
const clampToInput = (value: number) => Math.min(inputMax.value, Math.max(inputMin.value, value))

/**
 * `moveStep` is how far a modifier key just moved. It can only refine the grid,
 * never coarsen it: a big step still has to land on a regular step.
 */
const snap = (value: number, moveStep: number = props.step) => {
  const grid = Math.min(moveStep, props.step)
  const stepped = Math.round((value - props.min) / grid) * grid + props.min
  return Number(stepped.toFixed(decimalsOf(grid)))
}

/** the end of the track a thumb opens onto when `openEnded` and its value is `undefined` */
const openEnd = (index: number) => (isDual.value && index === 0 ? props.min : props.max)

/** an open-ended `undefined`, or a `'mixed'` value, still needs a concrete number
 *  to position and step from */
const numericAt = (index: number) => {
  if (isMixed.value) return props.min + originFraction.value * span.value
  return values.value[index] ?? openEnd(index)
}

const collapseIfOpen = (value: number, index: number): SliderThumbValue => {
  if (!props.openEnded) return value
  const end = openEnd(index)
  const isAtEnd = end === props.min ? value <= props.min : value >= props.max
  return isAtEnd ? undefined : value
}

const toFraction = (index: number) => (clampToTrack(numericAt(index)) - props.min) / span.value

/**
 * The dot is 12px wide, and its center travels between half a dot in from either
 * end of the track, as in a native range input, so at `min` and `max` the dot
 * sits flush with the track instead of hanging half off it. The fill and the
 * ticks follow the same travel, so they always meet a thumb at its center.
 * Expressed in `calc()` against the track's own width, the layout
 * never has to be measured.
 */
const thumbSize = 12
// a millionth of the track is far below a pixel, and keeps 0.6 - 0.2 from
// reaching the stylesheet as 0.39999999999999997
const tidy = (fraction: number) => Math.round(fraction * 1e6) / 1e6
const positionOf = (fraction: number) =>
  `calc(${thumbSize / 2}px + ${tidy(fraction)} * (100% - ${thumbSize}px))`

const fillStyle = computed(() => {
  if (isMixed.value) return { display: 'none' }
  const start = toFraction(0)
  if (isDual.value) {
    const other = toFraction(1)
    return {
      '--from': positionOf(Math.min(start, other)),
      '--to': positionOf(Math.max(start, other))
    }
  }
  // the origin end of a single thumb's fill sits on the track's edge, not under
  // a thumb, so it reaches the edge itself rather than stopping a half-dot short
  const from = Math.min(start, originFraction.value)
  const to = Math.max(start, originFraction.value)
  return {
    '--from': props.origin === 'start' ? '0%' : positionOf(from),
    '--to': props.origin === 'end' ? '100%' : positionOf(to)
  }
})

/**
 * Places `raw` on thumb `index`, resolving any collision with the other thumb.
 * Returns which thumb the interaction continues on, which `'swap'` changes.
 */
const applyThumb = (index: number, raw: number, step?: number) => {
  const value = clampToTrack(snap(raw, step))
  const thumbs = [...values.value]

  if (!isDual.value) {
    thumbs[index] = collapseIfOpen(value, index)
    return { thumbs, index }
  }

  const otherIndex = index === 0 ? 1 : 0
  const other = numericAt(otherIndex)
  const overlaps = index === 0 ? value > other - minGap.value : value < other + minGap.value

  if (!overlaps) {
    thumbs[index] = collapseIfOpen(value, index)
    return { thumbs, index }
  }

  if (props.thumbCollision === 'swap') {
    thumbs[index] = collapseIfOpen(other, index)
    thumbs[otherIndex] = collapseIfOpen(value, otherIndex)
    return { thumbs, index: otherIndex }
  }

  // the gap-derived positions below are already on the step grid, and re-snapping
  // them would round back across the thumb they are meant to stay clear of
  if (props.thumbCollision === 'push') {
    const pushed = clampToTrack(index === 0 ? value + minGap.value : value - minGap.value)
    // once the pushed thumb hits the track end it stops, and the dragged one stops with it
    const settled = clampToTrack(index === 0 ? pushed - minGap.value : pushed + minGap.value)
    thumbs[index] = collapseIfOpen(settled, index)
    thumbs[otherIndex] = collapseIfOpen(pushed, otherIndex)
    return { thumbs, index }
  }

  const blocked = clampToTrack(index === 0 ? other - minGap.value : other + minGap.value)
  thumbs[index] = collapseIfOpen(blocked, index)
  return { thumbs, index }
}

const toModel = (thumbs: SliderThumbValue[]): SliderModelValue =>
  isDual.value ? [thumbs[0], thumbs[1]] : thumbs[0]

const commit = (thumbs: SliderThumbValue[], isFinal: boolean) => {
  const model = toModel(thumbs)
  uncommitted.value = isFinal ? undefined : { model }
  emit('update:modelValue', model)
  if (isFinal) emit('change', model)
}

/**
 * Closes an interaction. Reports what the slider last emitted rather than what
 * `modelValue` holds, so a caller that defers writing the prop back still gets
 * the value the gesture landed on.
 */
const commitPending = () => {
  if (!uncommitted.value) return
  const { model } = uncommitted.value
  uncommitted.value = undefined
  emit('change', model)
}

const focusThumb = (index: number) => thumbRefs.value[index]?.focus()

const focusedIndex = ref<number | null>(null)
// whether the focused thumb shows a ring: a Tab or a key press says yes, a
// pointer gesture says no. Browsers infer the same from `:focus-visible`, except
// that focus moved by script mid-gesture inherits whatever the previously
// focused element was showing. A text input always shows a ring, so a drag
// that started while one was focused would light the thumb up
const focusFromKeyboard = ref(false)

const onThumbFocus = (index: number) => {
  focusedIndex.value = index
  if (activeIndex.value === null) focusFromKeyboard.value = true
}

const onThumbBlur = () => {
  focusedIndex.value = null
}

const showsFocusRing = (index: number) => focusedIndex.value === index && focusFromKeyboard.value

const valueFromPointer = (event: PointerEvent) => {
  const rect = trackRef.value?.getBoundingClientRect()
  const travel = (rect?.width ?? 0) - thumbSize
  if (!rect || travel <= 0) return props.min
  const offset = event.clientX - rect.left - thumbSize / 2
  const fraction = Math.min(1, Math.max(0, offset / travel))
  return props.min + fraction * span.value
}

const nearestThumb = (value: number) => {
  if (!isDual.value) return 0
  return Math.abs(value - numericAt(0)) <= Math.abs(value - numericAt(1)) ? 0 : 1
}

const drag = (event: PointerEvent) => {
  if (activeIndex.value === null) return
  const { thumbs, index } = applyThumb(activeIndex.value, valueFromPointer(event))
  activeIndex.value = index
  commit(thumbs, false)
}

const startDrag = (event: PointerEvent) => {
  if (props.disabled) return
  const thumbIndex = thumbRefs.value
    .slice(0, values.value.length)
    .findIndex(el => el?.contains(event.target as Node))
  const isOnTrack = thumbIndex === -1
  if (isOnTrack && !isTrackClickable.value) return

  // capturing on the track rather than the thumb keeps the drag alive when
  // `'swap'` hands the interaction over to the other thumb mid-gesture
  trackRef.value?.setPointerCapture(event.pointerId)
  activeIndex.value = isOnTrack ? nearestThumb(valueFromPointer(event)) : thumbIndex
  focusFromKeyboard.value = false
  focusThumb(activeIndex.value)
  if (isOnTrack) drag(event)
}

const endDrag = (event: PointerEvent) => {
  if (activeIndex.value === null) return
  trackRef.value?.releasePointerCapture(event.pointerId)
  activeIndex.value = null
  commitPending()
}

const stepFor = (event: KeyboardEvent) => {
  if (event.shiftKey && event.altKey && props.smallStep !== undefined) return props.smallStep
  if (event.shiftKey) return bigStep.value
  return props.step
}

/** the value a key moves to, alongside the step it should be snapped to */
const targetOf = (event: KeyboardEvent, index: number) => {
  const current = numericAt(index)
  const step = stepFor(event)
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return { value: current + step, step }
    case 'ArrowLeft':
    case 'ArrowDown':
      return { value: current - step, step }
    case 'PageUp':
      return { value: current + bigStep.value, step: bigStep.value }
    case 'PageDown':
      return { value: current - bigStep.value, step: bigStep.value }
    case 'Home':
      return { value: props.min, step: props.step }
    case 'End':
      return { value: props.max, step: props.step }
    default:
      return null
  }
}

const onKeydown = (event: KeyboardEvent, index: number) => {
  if (props.disabled) return
  const target = targetOf(event, index)
  if (!target) return

  event.preventDefault()
  focusFromKeyboard.value = true
  const { thumbs, index: nextIndex } = applyThumb(index, target.value, target.step)
  commit(thumbs, false)
  if (nextIndex !== index) focusThumb(nextIndex)
}

const onKeyup = () => {
  // a drag is still in flight when the pointer is down, and owns its own commit
  if (activeIndex.value === null) commitPending()
}

/** commits a typed value, which may sit outside `min`/`max` but never outside the hard limits */
const setValue = (index: number, value: SliderThumbValue) => {
  if (props.disabled) return
  // a cleared number input reports NaN through `valueAsNumber`, and NaN means
  // the same thing as no value at all
  if (value === undefined || Number.isNaN(value)) {
    const thumbs = [...values.value]
    thumbs[index] = undefined
    commit(thumbs, true)
    return
  }
  const clamped = clampToInput(value)
  const withinTrack = clamped >= props.min && clamped <= props.max
  // beyond the track the thumb just parks at the end, so collision handling doesn't apply
  if (!withinTrack) {
    const thumbs = [...values.value]
    thumbs[index] = clamped
    commit(thumbs, true)
    return
  }
  const { thumbs } = applyThumb(index, clamped)
  commit(thumbs, true)
}

const trackBounds = (index: number) => {
  if (!isDual.value || props.thumbCollision !== 'none') return { min: props.min, max: props.max }
  return index === 0
    ? { min: props.min, max: numericAt(1) - minGap.value }
    : { min: numericAt(0) + minGap.value, max: props.max }
}

/** a value typed past the track keeps its number while the thumb parks at the end,
 *  and aria wants the reported range to reach that number */
const thumbBounds = (index: number) => {
  const bounds = trackBounds(index)
  const value = values.value[index]
  if (value === undefined) return bounds
  return { min: Math.min(bounds.min, value), max: Math.max(bounds.max, value) }
}

const thumbLabel = (index: number) => {
  if (props.thumbLabels?.[index]) return props.thumbLabels[index]
  if (!isDual.value) return undefined
  return index === 0 ? 'Minimum' : 'Maximum'
}

const valueText = (index: number) => {
  if (isMixed.value) return 'Mixed'
  if (props.formatValue) return props.formatValue(values.value[index], index)
  if (values.value[index] !== undefined) return undefined
  return openEnd(index) === props.min ? 'No minimum' : 'No maximum'
}

// one class per state rather than overrides, so a thumb being dragged isn't
// out-specified by the hover it sits under
const thumbSurface = (index: number) => {
  if (props.disabled) return 'bg-white border-gray'
  if (isMixed.value) return 'bg-white border-warsaw'
  if (props.invalid) return 'bg-white border-error'
  if (activeIndex.value === index) return 'bg-primary-subtle border-primary-active'
  return 'bg-white border-warsaw group-hover/thumb:border-primary-hover group-hover/thumb:bg-primary-subtle'
}

const markLabel = (mark: SliderMark) => mark.label ?? props.formatValue?.(mark.value, 0)
const fractionOf = (value: number) => (clampToTrack(value) - props.min) / span.value
const markStyle = (mark: SliderMark) => ({ '--position': positionOf(fractionOf(mark.value)) })

/** a label at either end hangs half of itself off the track when it is centered on
 *  its tick, so those two are pinned flush with the track's ends instead */
const markLabelShift = (mark: SliderMark) => {
  const fraction = fractionOf(mark.value)
  if (fraction === 0) return ''
  if (fraction === 1) return '-translate-x-full'
  return '-translate-x-1/2'
}

const markLabelStyle = (mark: SliderMark) => {
  const fraction = fractionOf(mark.value)
  if (fraction === 0) return { '--position': '0%' }
  if (fraction === 1) return { '--position': '100%' }
  return { '--position': positionOf(fraction) }
}

const hasMarkLabels = computed(() => props.marks?.some(mark => markLabel(mark) !== undefined))
</script>

<template>
  <div
    v-bind="$attrs"
    role="group"
    :aria-disabled="disabled || undefined"
    class="flex w-full items-start gap-4">
    <!-- everything measured in track percentages shares this column, so that a
         wider `#input` slot can't pull the marks out of line with their ticks -->
    <div class="flex flex-1 flex-col gap-1">
      <div
        ref="trackRef"
        class="relative flex h-6 touch-none select-none items-center"
        :class="[disabled ? 'cursor-not-allowed opacity-40' : isTrackClickable && 'cursor-pointer']"
        @pointerdown="startDrag"
        @pointermove="drag"
        @pointerup="endDrag"
        @pointercancel="endDrag">
        <div
          class="absolute h-[6px] w-full rounded-full"
          :class="invalid ? 'bg-palered' : 'bg-athens'"></div>
        <div
          class="absolute left-(--from) h-[6px] w-[calc(var(--to)-var(--from))] rounded-full"
          :class="invalid ? 'bg-error' : 'bg-primary'"
          :style="fillStyle"></div>

        <span
          v-for="mark in marks"
          :key="`mark-${mark.value}`"
          aria-hidden="true"
          class="absolute left-(--position) h-[6px] w-px -translate-x-1/2 bg-white"
          :style="markStyle(mark)"></span>

        <div
          v-for="(value, index) in values"
          :key="`thumb-${index}`"
          :ref="el => (thumbRefs[index] = el as HTMLElement | null)"
          role="slider"
          :tabindex="disabled ? -1 : 0"
          :aria-label="thumbLabel(index)"
          :aria-orientation="'horizontal'"
          :aria-valuemin="thumbBounds(index).min"
          :aria-valuemax="thumbBounds(index).max"
          :aria-valuenow="isMixed ? undefined : numericAt(index)"
          :aria-valuetext="valueText(index)"
          :aria-disabled="disabled || undefined"
          class="group/thumb absolute left-(--position) flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full outline-hidden"
          :class="disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'"
          :style="{ '--position': positionOf(toFraction(index)) }"
          @focus="onThumbFocus(index)"
          @blur="onThumbBlur"
          @keydown="onKeydown($event, index)"
          @keyup="onKeyup">
          <!-- the focus ring and hover belong on the dot, not on the 24px hit area
               around it, which would draw them floating clear of anything visible -->
          <span
            class="h-3 w-3 rounded-full border transition-colors"
            :class="[
              thumbSurface(index),
              showsFocusRing(index) && 'outline-2 -outline-offset-2 outline-primary-hover'
            ]"></span>
        </div>
      </div>

      <!-- pinned to the ends of the track, not tracking the thumbs: a field that
           slides away is one you can't click twice in the same place -->
      <div v-if="$slots['thumb-label']" class="flex items-start justify-between gap-2">
        <div v-for="(value, index) in values" :key="`thumb-label-${index}`">
          <slot
            name="thumb-label"
            v-bind="{
              value,
              index,
              min: inputMin,
              max: inputMax,
              step,
              disabled,
              setValue
            }"></slot>
        </div>
      </div>

      <div v-if="hasMarkLabels" aria-hidden="true" class="relative h-4">
        <span
          v-for="mark in marks"
          :key="`mark-label-${mark.value}`"
          class="body-xs absolute left-(--position) whitespace-nowrap text-stone"
          :class="markLabelShift(mark)"
          :style="markLabelStyle(mark)">
          {{ markLabel(mark) }}
        </span>
      </div>
    </div>

    <!-- matches the track row's height, so the slot content centers on the track's
         axis instead of hanging from the top of the taller column beside it -->
    <div v-if="$slots.input" class="flex h-6 items-center">
      <!-- bound as an object so `setValue` reaches the slot camel-cased, which
           an attribute binding would not guarantee -->
      <slot
        name="input"
        v-bind="{ values, min: inputMin, max: inputMax, step, disabled, setValue }"></slot>
    </div>
  </div>
</template>
