import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import NumberInput from '../NumberInput.vue'

describe('NumberInput.vue', () => {
  describe('when the input value is changed by typing in new value', () => {
    it('emits one event', async () => {
      const { getByRole, emitted } = render(NumberInput, {
        props: { modelValue: '1' }
      })
      await userEvent.type(getByRole('spinbutton'), '3')
      expect(emitted()['update:model-value'][0]).toEqual(['3'])
      expect(emitted()['update:by-step']).toBeUndefined()
    })
  })
  describe('when the input value is changed by using arrow keys', () => {
    it('emits 2 events', async () => {
      const { emitted } = render(NumberInput, {
        props: { modelValue: '1' }
      })
      await userEvent.tab()
      await userEvent.keyboard('[ArrowUp]')
      expect(emitted()['update:model-value'][0]).toEqual(['2'])
      expect(emitted()['update:by-step'][0]).toEqual(['2'])
    })
  })
  describe('when the input value is changed by clicking a stepper button', () => {
    it('emits 2 events', async () => {
      const { getByRole, emitted } = render(NumberInput, {
        props: { modelValue: '1' }
      })
      await userEvent.click(getByRole('button', { name: 'Step Up' }))
      expect(emitted()['update:model-value'][0]).toEqual(['2'])
      expect(emitted()['update:by-step'][0]).toEqual(['2'])
    })
    describe('and the shift key is pressed', () => {
      it('changes the value by `bigStep` increments', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: '10', bigStep: '10' }
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
          props: { modelValue: '10' }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}')
        await user.click(getByRole('button', { name: 'Step Up' }))

        expect(getByRole('spinbutton')).toHaveValue(11)

        await user.keyboard('{Shift>}')
        await user.click(getByRole('button', { name: 'Step Down' }))
        expect(getByRole('spinbutton')).toHaveValue(10)
      })
    })
    describe('and the shift+alt keys are pressed', () => {
      it('changes the value by `smallStep` increments', async () => {
        const { getByRole } = render(NumberInput, {
          props: { modelValue: '10', smallStep: '0.1' }
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
          props: { modelValue: '10' }
        })
        const user = userEvent.setup()
        await user.keyboard('{Shift>}{Alt>}')
        await user.click(getByRole('button', { name: 'Step Up' }))

        expect(getByRole('spinbutton')).toHaveValue(11)

        await user.keyboard('{Shift>}{Alt>}')
        await user.click(getByRole('button', { name: 'Step Down' }))
        expect(getByRole('spinbutton')).toHaveValue(10)
      })
    })
  })
})
