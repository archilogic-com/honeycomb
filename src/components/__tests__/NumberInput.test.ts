import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { nextTick } from 'vue'

import NumberInput from '../NumberInput.vue'

describe('NumberInput.vue', () => {
  describe('when rendering', () => {
    it('displays the initial value correctly', () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 42 }
      })
      expect(getByRole('spinbutton')).toHaveValue(42)
    })

    it('applies size classes correctly', () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 0, size: 'md' }
      })
      expect(getByRole('spinbutton')).toHaveClass('a-text-input--md')
    })

    it('shows invalid state when invalid prop is true', () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 0, invalid: true }
      })
      expect(getByRole('spinbutton')).toHaveClass('a-text-input--invalid')
      expect(getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true')
    })

    it('applies placeholder text correctly', () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 0, placeholder: 'Enter a number' }
      })
      expect(getByRole('spinbutton')).toHaveAttribute('placeholder', 'Enter a number')
    })

    it('generates default placeholder for subtle variant', () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 0, variant: 'subtle' },
        attrs: { type: 'number' }
      })
      expect(getByRole('spinbutton')).toHaveAttribute('placeholder', 'Add number value')
    })
  })

  describe('when the input value is changed by typing a new value', () => {
    it('emits one event', async () => {
      const { getByRole, emitted } = render(NumberInput, {
        props: { modelValue: 1 }
      })
      await userEvent.type(getByRole('spinbutton'), '3')
      expect(emitted()['update:model-value'][0]).toEqual([3])
      expect(emitted()['update:by-step']).toBeUndefined()
    })

    it('handles decimal numbers correctly', async () => {
      const { getByRole, emitted } = render(NumberInput, {
        props: { modelValue: 1, step: 0.01 }
      })
      const input = getByRole('spinbutton') as HTMLInputElement
      input.value = '3.14'
      await userEvent.tab()
      const event = new Event('input')
      input.dispatchEvent(event)
      expect(emitted()['update:model-value'][0]).toEqual([3.14])
    })
  })

  describe('when the input value is changed by using arrow keys', () => {
    it('emits 2 events when using arrow up', async () => {
      const { emitted } = render(NumberInput, {
        props: { modelValue: 1 }
      })
      await userEvent.tab()
      await userEvent.keyboard('[ArrowUp]')
      expect(emitted()['update:model-value'][0]).toEqual([2])
      expect(emitted()['update:by-step'][0]).toEqual([2])
    })

    it('emits 2 events when using arrow down', async () => {
      const { emitted } = render(NumberInput, {
        props: { modelValue: 1 }
      })
      await userEvent.tab()
      await userEvent.keyboard('[ArrowDown]')
      expect(emitted()['update:model-value'][0]).toEqual([0])
      expect(emitted()['update:by-step'][0]).toEqual([0])
    })

    it('respects custom step value', async () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 1, step: 0.5 }
      })
      await userEvent.tab()
      await userEvent.keyboard('[ArrowUp]')
      expect(getByRole('spinbutton')).toHaveValue(1.5)
    })
  })

  describe('when the input value is changed by clicking a stepper button', () => {
    it('emits 2 events', async () => {
      const { getByRole, emitted } = render(NumberInput, {
        props: { modelValue: 1 }
      })
      await userEvent.click(getByRole('button', { name: 'Step Up' }))
      expect(emitted()['update:model-value'][0]).toEqual([2])
      expect(emitted()['update:by-step'][0]).toEqual([2])
    })

    describe('and the shift key is pressed', () => {
      it('changes the value by `bigStep` increments', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: 10, bigStep: 10 }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}')
        await user.click(getByRole('button', { name: 'Step Up' }))
        expect(getByRole('spinbutton')).toHaveValue(20)

        await user.keyboard('{Shift>}')
        await user.click(getByRole('button', { name: 'Step Down' }))
        expect(getByRole('spinbutton')).toHaveValue(10)
      })

      it('changes the value by regular `step` increments if `bigStep` is not provided', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: 10 }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}')
        await user.click(getByRole('button', { name: 'Step Up' }))
        expect(getByRole('spinbutton')).toHaveValue(11)
      })
    })

    describe('and the shift+alt keys are pressed', () => {
      it('changes the value by `smallStep` increments', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: 10, smallStep: 0.1 }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}{Alt>}')
        await user.click(getByRole('button', { name: 'Step Up' }))
        expect(getByRole('spinbutton')).toHaveValue(10.1)

        await user.keyboard('{Shift>}{Alt>}')
        await user.click(getByRole('button', { name: 'Step Down' }))
        expect(getByRole('spinbutton')).toHaveValue(10)
      })

      it('changes the value by regular `step` increments if `smallStep` is not provided', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: 10 }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}{Alt>}')
        await user.click(getByRole('button', { name: 'Step Up' }))
        expect(getByRole('spinbutton')).toHaveValue(11)
      })
    })
  })

  describe('input behavior', () => {
    it('selects all text on click for sm size', async () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 123, size: 'sm' }
      })
      const input = getByRole('spinbutton') as HTMLInputElement

      const selectSpy = vi.spyOn(input, 'select')

      await userEvent.click(input)
      await nextTick()

      expect(selectSpy).toHaveBeenCalled()
      selectSpy.mockRestore()
    })

    it('does not select all text on click for md size', async () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 123, size: 'md' }
      })
      const input = getByRole('spinbutton') as HTMLInputElement
      await userEvent.click(input)

      expect(input.selectionStart).toBe(input.selectionEnd)
    })

    it('respects disabled state', async () => {
      const { getByRole } = render(NumberInput, {
        props: { modelValue: 10 },
        attrs: { disabled: true }
      })
      const input = getByRole('spinbutton')
      expect(input).toBeDisabled()
    })
  })
})
