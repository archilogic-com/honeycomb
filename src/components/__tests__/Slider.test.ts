import { fireEvent, render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { h } from 'vue'

import Slider from '../Slider.vue'
import type { SliderThumbValue } from '../Slider.vue'

/** jsdom has no layout, so pointer maths needs a track of a known size */
const giveTrackWidth = (track: HTMLElement, width = 200) => {
  track.getBoundingClientRect = () => ({ left: 0, width, top: 0, height: 24 }) as DOMRect
  track.setPointerCapture = () => {}
  track.releasePointerCapture = () => {}
}

const trackOf = (thumb: HTMLElement) => thumb.parentElement as HTMLElement

/** where a thumb's centre lands: half a dot in from either end, then along the rest */
const positionAt = (fraction: number) => `calc(6px + ${fraction} * (100% - 12px))`
const fillOf = (element: HTMLElement) => [
  element.style.getPropertyValue('--from'),
  element.style.getPropertyValue('--to')
]
const positionOf = (element: HTMLElement) => element.style.getPropertyValue('--position')

describe('Slider.vue', () => {
  describe('when rendering a single-thumb slider', () => {
    it('renders one thumb with the value in its aria attributes', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: 30, min: 0, max: 100 }
      })
      const thumbs = getAllByRole('slider')
      expect(thumbs).toHaveLength(1)
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '30')
      expect(thumbs[0]).toHaveAttribute('aria-valuemin', '0')
      expect(thumbs[0]).toHaveAttribute('aria-valuemax', '100')
    })

    it('is reachable by keyboard', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 30 } })
      expect(getByRole('slider')).toHaveAttribute('tabindex', '0')
    })
  })

  describe('when rendering a range slider', () => {
    it('renders a thumb per value, labelled minimum and maximum', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [20, 60], min: 0, max: 100 }
      })
      const thumbs = getAllByRole('slider')
      expect(thumbs).toHaveLength(2)
      expect(thumbs[0]).toHaveAttribute('aria-label', 'Minimum')
      expect(thumbs[1]).toHaveAttribute('aria-label', 'Maximum')
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '20')
      expect(thumbs[1]).toHaveAttribute('aria-valuenow', '60')
    })

    it('accepts custom thumb labels', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [20, 60], thumbLabels: ['Narrowest', 'Widest'] }
      })
      expect(getAllByRole('slider')[0]).toHaveAttribute('aria-label', 'Narrowest')
      expect(getAllByRole('slider')[1]).toHaveAttribute('aria-label', 'Widest')
    })

    it('reports the other thumb as its bound when thumbs cannot cross', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [20, 60], min: 0, max: 100, thumbCollision: 'none' }
      })
      expect(getAllByRole('slider')[0]).toHaveAttribute('aria-valuemax', '60')
      expect(getAllByRole('slider')[1]).toHaveAttribute('aria-valuemin', '20')
    })
  })

  describe('when using the keyboard', () => {
    it('steps up on ArrowRight and commits on key release', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, min: 0, max: 100, step: 5 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight}')

      expect(emitted()['update:modelValue'][0]).toEqual([35])
      expect(emitted().change[0]).toEqual([35])
    })

    it('does not commit until the key is released', async () => {
      const { getByRole, emitted } = render(Slider, { props: { modelValue: 30 } })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight>}')

      expect(emitted()['update:modelValue']).toHaveLength(1)
      expect(emitted().change).toBeUndefined()
    })

    it('steps down on ArrowLeft', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, step: 5 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(emitted()['update:modelValue'][0]).toEqual([25])
    })

    it('uses ten steps for Shift + arrow by default', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, step: 2 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}')
      expect(emitted()['update:modelValue'][0]).toEqual([50])
    })

    it('uses bigStep for Shift + arrow when provided', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, step: 1, bigStep: 25 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}')
      expect(emitted()['update:modelValue'][0]).toEqual([55])
    })

    it('uses smallStep for Shift + Alt + arrow', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, step: 1, smallStep: 0.1 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{Shift>}{Alt>}{ArrowRight}{/Alt}{/Shift}')
      expect(emitted()['update:modelValue'][0]).toEqual([30.1])
    })

    it('jumps to the bounds on Home and End', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, min: 10, max: 90 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{Home}')
      await userEvent.keyboard('{End}')

      expect(emitted()['update:modelValue'][0]).toEqual([10])
      expect(emitted()['update:modelValue'][1]).toEqual([90])
    })

    it('clamps to the track bounds', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 98, min: 0, max: 100, step: 5 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([100])
    })

    it('avoids floating point drift on fractional steps', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 0.2, min: 0, max: 1, step: 0.1 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([0.3])
    })

    it('ignores unrelated keys', async () => {
      const { getByRole, emitted } = render(Slider, { props: { modelValue: 30 } })
      getByRole('slider').focus()
      await userEvent.keyboard('a')
      expect(emitted()['update:modelValue']).toBeUndefined()
    })
  })

  describe('when two thumbs meet', () => {
    it('pushes the other thumb along by default', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [20, 25], min: 0, max: 100, step: 10 }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[30, 30]])
    })

    it('keeps a minimum gap while pushing', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: {
          modelValue: [20, 25],
          min: 0,
          max: 100,
          step: 10,
          minStepsBetweenThumbs: 1
        }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[30, 40]])
    })

    it('blocks the dragged thumb when collision is none', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: {
          modelValue: [20, 25],
          min: 0,
          max: 100,
          step: 10,
          thumbCollision: 'none'
        }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[25, 25]])
    })

    it('exchanges the two values when collision is swap', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: {
          modelValue: [20, 25],
          min: 0,
          max: 100,
          step: 10,
          thumbCollision: 'swap'
        }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[25, 30]])
    })

    it('stops both thumbs at the track end when pushing runs out of room', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: {
          modelValue: [90, 100],
          min: 0,
          max: 100,
          step: 10,
          minStepsBetweenThumbs: 1
        }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[90, 100]])
    })
  })

  describe('when the range is open-ended', () => {
    it('emits undefined once the lower thumb reaches min', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [10, 60], min: 0, max: 100, step: 10, openEnded: true }
      })
      getAllByRole('slider')[0].focus()
      await userEvent.keyboard('{ArrowLeft}')
      expect(emitted()['update:modelValue'][0]).toEqual([[undefined, 60]])
    })

    it('emits undefined once the upper thumb reaches max', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [10, 90], min: 0, max: 100, step: 10, openEnded: true }
      })
      getAllByRole('slider')[1].focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([[10, undefined]])
    })

    it('announces an open end instead of a value', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [undefined, undefined], min: 0, max: 100, openEnded: true }
      })
      expect(getAllByRole('slider')[0]).toHaveAttribute('aria-valuetext', 'No minimum')
      expect(getAllByRole('slider')[1]).toHaveAttribute('aria-valuetext', 'No maximum')
    })

    it('parks an open thumb at its end of the track', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [undefined, undefined], min: 0, max: 100, openEnded: true }
      })
      expect(positionOf(getAllByRole('slider')[0])).toBe(positionAt(0))
      expect(positionOf(getAllByRole('slider')[1])).toBe(positionAt(1))
    })

    it('re-opens the range when a thumb returns to its end', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [undefined, 90], min: 0, max: 100, step: 10, openEnded: true }
      })
      getAllByRole('slider')[1].focus()
      await userEvent.keyboard('{End}')
      expect(emitted()['update:modelValue'][0]).toEqual([[undefined, undefined]])
    })
  })

  describe('when the value is mixed', () => {
    it('omits aria-valuenow and announces the mixed state', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 'mixed' } })
      const thumb = getByRole('slider')
      expect(thumb).not.toHaveAttribute('aria-valuenow')
      expect(thumb).toHaveAttribute('aria-valuetext', 'Mixed')
    })

    it('resolves to a concrete value on interaction', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 'mixed', min: 0, max: 100, step: 10 }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue'][0]).toEqual([10])
    })

    it('rests at the origin', () => {
      const { getByRole } = render(Slider, {
        props: { modelValue: 'mixed', min: -180, max: 180, origin: 'center' }
      })
      expect(positionOf(getByRole('slider'))).toBe(positionAt(0.5))
    })
  })

  describe('when a numeric input is slotted in', () => {
    const renderWithInput = (props: Record<string, unknown>, value: SliderThumbValue) =>
      render(Slider, {
        props,
        slots: {
          input: (slotProps: {
            min: number
            max: number
            setValue: (index: number, value: SliderThumbValue) => void
          }) => [
            h('button', { onClick: () => slotProps.setValue(0, value) }, 'set'),
            h('span', { 'data-testid': 'bounds' }, `${slotProps.min}-${slotProps.max}`)
          ]
        }
      })

    it('commits a typed value immediately', async () => {
      const { getByRole, emitted } = renderWithInput({ modelValue: 5, min: 0, max: 10 }, 8)
      await userEvent.click(getByRole('button'))
      expect(emitted()['update:modelValue'][0]).toEqual([8])
      expect(emitted().change[0]).toEqual([8])
    })

    it('exposes the hard limits as the input bounds', () => {
      const { getByTestId } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, hardMin: -50, hardMax: 50 },
        0
      )
      expect(getByTestId('bounds')).toHaveTextContent('-50-50')
    })

    it('falls back to the track bounds when no hard limits are set', () => {
      const { getByTestId } = renderWithInput({ modelValue: 5, min: 0, max: 10 }, 0)
      expect(getByTestId('bounds')).toHaveTextContent('0-10')
    })

    it('accepts a typed value past max, up to the hard limit', async () => {
      const { getByRole, emitted } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, hardMax: 50 },
        42
      )
      await userEvent.click(getByRole('button'))
      expect(emitted()['update:modelValue'][0]).toEqual([42])
    })

    it('clamps a typed value to the hard limit', async () => {
      const { getByRole, emitted } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, hardMax: 50 },
        999
      )
      await userEvent.click(getByRole('button'))
      expect(emitted()['update:modelValue'][0]).toEqual([50])
    })

    it('stretches the reported range to a value parked beyond the track', async () => {
      const { getByRole, rerender } = render(Slider, {
        props: { modelValue: 42, min: 0, max: 10, hardMax: 50 }
      })
      expect(getByRole('slider')).toHaveAttribute('aria-valuenow', '42')
      expect(getByRole('slider')).toHaveAttribute('aria-valuemax', '42')
      expect(getByRole('slider')).toHaveAttribute('aria-valuemin', '0')

      await rerender({ modelValue: -5, min: 0, max: 10, hardMin: -50 })
      expect(getByRole('slider')).toHaveAttribute('aria-valuemin', '-5')
      expect(getByRole('slider')).toHaveAttribute('aria-valuemax', '10')
    })

    it('parks the thumb at the track end for a value beyond it', async () => {
      const { getByRole, getAllByRole, rerender } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, hardMax: 50 },
        42
      )
      await userEvent.click(getByRole('button'))
      await rerender({ modelValue: 42, min: 0, max: 10, hardMax: 50 })
      expect(positionOf(getAllByRole('slider')[0])).toBe(positionAt(1))
    })

    it('clears the value when the input clears it', async () => {
      const { getByRole, emitted } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, openEnded: true },
        undefined
      )
      await userEvent.click(getByRole('button'))
      expect(emitted()['update:modelValue'][0]).toEqual([undefined])
    })

    it('treats the NaN of a cleared number input as clearing the value', async () => {
      const { getByRole, emitted } = renderWithInput(
        { modelValue: 5, min: 0, max: 10, openEnded: true },
        Number.NaN
      )
      await userEvent.click(getByRole('button'))
      expect(emitted()['update:modelValue'][0]).toEqual([undefined])
    })

    it('centres the slot content on the track axis rather than the column top', () => {
      const { getByTestId } = render(Slider, {
        props: { modelValue: 5 },
        slots: { input: () => h('div', { 'data-testid': 'slot-content' }) }
      })
      expect(getByTestId('slot-content').parentElement).toHaveClass('h-6', 'items-center')
    })
  })

  describe('when each thumb has its own label', () => {
    const renderWithThumbLabels = (props: Record<string, unknown>) =>
      render(Slider, {
        props,
        slots: {
          'thumb-label': (slotProps: {
            value: SliderThumbValue
            index: number
            min: number
            max: number
            setValue: (index: number, value: SliderThumbValue) => void
          }) =>
            h(
              'button',
              {
                'data-testid': `label-${slotProps.index}`,
                'data-bounds': `${slotProps.min}-${slotProps.max}`,
                onClick: () => slotProps.setValue(slotProps.index, 99)
              },
              String(slotProps.value)
            )
        }
      })

    it('renders the slot once per thumb', () => {
      const { getByTestId } = renderWithThumbLabels({ modelValue: [20, 60] })
      expect(getByTestId('label-0')).toHaveTextContent('20')
      expect(getByTestId('label-1')).toHaveTextContent('60')
    })

    it('holds the labels still while the thumbs move', async () => {
      const { getByTestId, getAllByRole, rerender } = renderWithThumbLabels({
        modelValue: [20, 60],
        min: 0,
        max: 100
      })
      expect(getByTestId('label-0').parentElement).not.toHaveAttribute('style')
      await rerender({ modelValue: [45, 60], min: 0, max: 100 })
      expect(positionOf(getAllByRole('slider')[0])).toBe(positionAt(0.45))
      expect(getByTestId('label-0').parentElement).not.toHaveAttribute('style')
    })

    it('commits through the same setValue as the input slot, collisions included', async () => {
      const { getByTestId, emitted } = renderWithThumbLabels({
        modelValue: [20, 60],
        min: 0,
        max: 100
      })
      await userEvent.click(getByTestId('label-0'))
      expect(emitted()['update:modelValue'][0]).toEqual([[99, 99]])
      expect(emitted().change).toHaveLength(1)
    })

    it('blocks a typed value at the other thumb when collisions are off', async () => {
      const { getByTestId, emitted } = renderWithThumbLabels({
        modelValue: [20, 60],
        min: 0,
        max: 100,
        thumbCollision: 'none'
      })
      await userEvent.click(getByTestId('label-0'))
      expect(emitted()['update:modelValue'][0]).toEqual([[60, 60]])
    })

    it('passes the hard limits as the label bounds', () => {
      const { getByTestId } = renderWithThumbLabels({
        modelValue: 5,
        min: 0,
        max: 10,
        hardMax: 50
      })
      expect(getByTestId('label-0')).toHaveAttribute('data-bounds', '0-50')
    })

    it('is not rendered when the slot is absent', () => {
      const { container } = render(Slider, { props: { modelValue: 20 } })
      expect(container.querySelector('.grid')).toBeNull()
    })
  })

  describe('when marks share a row with the input slot', () => {
    it('keeps the mark labels in the same column as the track', () => {
      const { getByText, getByRole } = render(Slider, {
        props: { modelValue: 50, marks: [{ value: 50, label: 'Half' }] },
        slots: { input: () => h('div', { style: 'width: 200px' }, 'wide input') }
      })
      const trackColumn = trackOf(getByRole('slider')).parentElement
      expect(trackColumn).toContainElement(getByText('Half'))
    })
  })

  describe('when using a pointer', () => {
    it('keeps the dot flush with the track at either end, and reads the pointer the same way', async () => {
      const { getByRole, emitted, rerender } = render(Slider, {
        props: { modelValue: 0, min: 0, max: 100, step: 1 }
      })
      const thumb = getByRole('slider')
      const track = trackOf(thumb)
      giveTrackWidth(track)
      expect(positionOf(thumb)).toBe(positionAt(0))

      // the first half-dot of the track still means the minimum…
      await userEvent.pointer({ target: track, coords: { clientX: 6 }, keys: '[MouseLeft]' })
      expect(emitted()['update:modelValue'].at(-1)).toEqual([0])

      // …and the last half-dot the maximum, with the thumb's centre a half-dot in
      await userEvent.pointer({ target: track, coords: { clientX: 194 }, keys: '[MouseLeft]' })
      expect(emitted()['update:modelValue'].at(-1)).toEqual([100])
      await rerender({ modelValue: 100, min: 0, max: 100, step: 1 })
      expect(positionOf(thumb)).toBe(positionAt(1))
    })

    it('moves the nearest thumb to a click on the track', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 0, min: 0, max: 100, step: 1 }
      })
      const track = trackOf(getByRole('slider'))
      giveTrackWidth(track)

      await userEvent.pointer({ target: track, coords: { clientX: 147 }, keys: '[MouseLeft]' })

      expect(emitted()['update:modelValue'][0]).toEqual([75])
      expect(emitted().change).toHaveLength(1)
    })

    it('focuses the thumb within the press itself, not a tick later', async () => {
      const { getByRole } = render(Slider, {
        props: { modelValue: 0, min: 0, max: 100, step: 1 }
      })
      const thumb = getByRole('slider')
      giveTrackWidth(trackOf(thumb))

      fireEvent.pointerDown(trackOf(thumb), { clientX: 147, pointerId: 1 })

      expect(thumb).toHaveFocus()
    })

    it('ignores track clicks on a range slider', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [20, 60], min: 0, max: 100 }
      })
      const track = trackOf(getAllByRole('slider')[0])
      giveTrackWidth(track)

      await userEvent.pointer({ target: track, coords: { clientX: 147 }, keys: '[MouseLeft]' })

      expect(emitted()['update:modelValue']).toBeUndefined()
    })

    it('allows track clicks on a range slider when opted in', async () => {
      const { getAllByRole, emitted } = render(Slider, {
        props: { modelValue: [20, 60], min: 0, max: 100, allowTrackClick: true }
      })
      const track = trackOf(getAllByRole('slider')[0])
      giveTrackWidth(track)

      await userEvent.pointer({ target: track, coords: { clientX: 147 }, keys: '[MouseLeft]' })

      expect(emitted()['update:modelValue'][0]).toEqual([[20, 75]])
    })

    it('drags a thumb and commits once on release', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 0, min: 0, max: 100, step: 1 }
      })
      const thumb = getByRole('slider')
      giveTrackWidth(trackOf(thumb))

      await userEvent.pointer([
        { target: thumb, coords: { clientX: 0 }, keys: '[MouseLeft>]' },
        { target: thumb, coords: { clientX: 40 } },
        { target: thumb, coords: { clientX: 100 } },
        { target: thumb, keys: '[/MouseLeft]' }
      ])

      expect(emitted()['update:modelValue'].at(-1)).toEqual([50])
      expect(emitted().change).toHaveLength(1)
    })
  })

  describe('when styling the thumb', () => {
    const dotOf = (thumb: HTMLElement) => thumb.firstElementChild as HTMLElement

    it('walks the primary colours from rest to pressed and back', async () => {
      const { getByRole } = render(Slider, { props: { modelValue: 0, min: 0, max: 100, step: 1 } })
      const thumb = getByRole('slider')
      giveTrackWidth(trackOf(thumb))
      expect(dotOf(thumb)).toHaveClass('border-warsaw', 'group-hover/thumb:border-primary-hover')

      await fireEvent.pointerDown(thumb, { clientX: 40, pointerId: 1 })
      expect(dotOf(thumb)).toHaveClass('border-primary-active', 'bg-primary-subtle')
      expect(dotOf(thumb)).not.toHaveClass('group-hover/thumb:border-primary-hover')

      await fireEvent.pointerUp(thumb, { clientX: 40, pointerId: 1 })
      expect(dotOf(thumb)).toHaveClass('border-warsaw', 'bg-white')
    })

    it('keeps a hovered thumb opaque, so the track cannot show through it', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 40 } })
      expect(dotOf(getByRole('slider'))).toHaveClass('group-hover/thumb:bg-primary-subtle')
    })

    it('dims a disabled thumb rather than recolouring it', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 30, disabled: true } })
      const thumb = getByRole('slider')
      expect(dotOf(thumb)).toHaveClass('bg-white', 'border-gray')
      expect(dotOf(thumb)).not.toHaveClass('group-hover/thumb:border-primary-hover')
      expect(trackOf(thumb)).toHaveClass('opacity-40')
    })

    it('holds an invalid thumb on the error colour instead of the hover colour', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 30, invalid: true } })
      expect(dotOf(getByRole('slider'))).toHaveClass('border-error')
      expect(dotOf(getByRole('slider'))).not.toHaveClass('group-hover/thumb:border-primary-hover')
    })

    it('rings a thumb reached by keyboard, not one grabbed by pointer, until a key moves it', async () => {
      const { getByRole } = render(Slider, { props: { modelValue: 30, min: 0, max: 100 } })
      const thumb = getByRole('slider')
      giveTrackWidth(trackOf(thumb))

      await fireEvent.focus(thumb)
      expect(dotOf(thumb)).toHaveClass('outline-primary-hover')
      await fireEvent.blur(thumb)
      expect(dotOf(thumb)).not.toHaveClass('outline-primary-hover')

      await fireEvent.pointerDown(thumb, { clientX: 60, pointerId: 1 })
      await fireEvent.pointerUp(thumb, { clientX: 60, pointerId: 1 })
      expect(thumb).toHaveFocus()
      expect(dotOf(thumb)).not.toHaveClass('outline-primary-hover')

      await fireEvent.keyDown(thumb, { key: 'ArrowRight' })
      expect(dotOf(thumb)).toHaveClass('outline-primary-hover')
    })
  })

  describe('when disabled', () => {
    it('takes the thumb out of the tab order', () => {
      const { getByRole } = render(Slider, { props: { modelValue: 30, disabled: true } })
      expect(getByRole('slider')).toHaveAttribute('tabindex', '-1')
    })

    it('does not respond to the keyboard', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, disabled: true }
      })
      getByRole('slider').focus()
      await userEvent.keyboard('{ArrowRight}')
      expect(emitted()['update:modelValue']).toBeUndefined()
    })

    it('does not respond to the pointer', async () => {
      const { getByRole, emitted } = render(Slider, {
        props: { modelValue: 30, disabled: true }
      })
      const track = trackOf(getByRole('slider'))
      giveTrackWidth(track)

      await userEvent.pointer({ target: track, coords: { clientX: 147 }, keys: '[MouseLeft]' })

      expect(emitted()['update:modelValue']).toBeUndefined()
    })
  })

  describe('when formatting values', () => {
    it('uses formatValue for the screen reader text', () => {
      const { getByRole } = render(Slider, {
        props: {
          modelValue: 0.5,
          min: 0,
          max: 1,
          step: 0.01,
          formatValue: (value: SliderThumbValue) => `${Math.round((value ?? 0) * 100)}%`
        }
      })
      expect(getByRole('slider')).toHaveAttribute('aria-valuetext', '50%')
    })

    it('lets formatValue name the open end', () => {
      const { getByRole } = render(Slider, {
        props: {
          modelValue: undefined,
          min: 0,
          max: 100,
          openEnded: true,
          formatValue: (value: SliderThumbValue) => (value === undefined ? '100+' : `${value}`)
        }
      })
      expect(getByRole('slider')).toHaveAttribute('aria-valuetext', '100+')
    })

    it('renders mark labels', () => {
      const { getByText } = render(Slider, {
        props: {
          modelValue: 50,
          marks: [
            { value: 0, label: 'Low' },
            { value: 100, label: 'High' }
          ]
        }
      })
      expect(getByText('Low')).toBeInTheDocument()
      expect(getByText('High')).toBeInTheDocument()
    })

    it('centres a mark label on its tick', () => {
      const { getByText } = render(Slider, {
        props: { modelValue: 50, marks: [{ value: 50, label: 'Half' }] }
      })
      expect(getByText('Half')).toHaveClass('-translate-x-1/2')
      expect(positionOf(getByText('Half'))).toBe(positionAt(0.5))
    })

    it('pins the mark labels at either end flush with the track', () => {
      const { getByText } = render(Slider, {
        props: {
          modelValue: 0,
          min: -180,
          max: 180,
          marks: [
            { value: -180, label: 'Low' },
            { value: 180, label: 'High' }
          ]
        }
      })
      expect(positionOf(getByText('Low'))).toBe('0%')
      expect(getByText('Low').className).not.toContain('translate-x')
      expect(getByText('High')).toHaveClass('-translate-x-full')
      expect(positionOf(getByText('High'))).toBe('100%')
    })

    it('falls back to formatValue for unlabelled marks', () => {
      const { getByText } = render(Slider, {
        props: {
          modelValue: 50,
          marks: [{ value: 25 }],
          formatValue: (value: SliderThumbValue) => `${value} m²`
        }
      })
      expect(getByText('25 m²')).toBeInTheDocument()
    })
  })

  describe('when the fill has an origin', () => {
    it('grows from the start by default', () => {
      const { getByRole } = render(Slider, {
        props: { modelValue: 25, min: 0, max: 100 }
      })
      const fill = trackOf(getByRole('slider')).children[1] as HTMLElement
      expect(fillOf(fill)).toEqual(['0%', positionAt(0.25)])
    })

    it('reaches the far edge of the track when it grows from the end', () => {
      const { getByRole } = render(Slider, {
        props: { modelValue: 25, min: 0, max: 100, origin: 'end' }
      })
      const fill = trackOf(getByRole('slider')).children[1] as HTMLElement
      expect(fillOf(fill)).toEqual([positionAt(0.25), '100%'])
    })

    it('grows outwards from the centre', () => {
      const { getByRole } = render(Slider, {
        props: { modelValue: -90, min: -180, max: 180, origin: 'center' }
      })
      const fill = trackOf(getByRole('slider')).children[1] as HTMLElement
      expect(fillOf(fill)).toEqual([positionAt(0.25), positionAt(0.5)])
    })

    it('spans between the thumbs of a range', () => {
      const { getAllByRole } = render(Slider, {
        props: { modelValue: [20, 60], min: 0, max: 100 }
      })
      const fill = trackOf(getAllByRole('slider')[0]).children[1] as HTMLElement
      expect(fillOf(fill)).toEqual([positionAt(0.2), positionAt(0.6)])
    })
  })
})
