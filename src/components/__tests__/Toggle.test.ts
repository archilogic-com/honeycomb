import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import Toggle from '../Toggle.vue'

describe('Toggle.vue', () => {
  describe('when a toggle is off', () => {
    it('applies "aria-pressed=false" to the button', () => {
      const { getByRole } = render(Toggle, {
        props: { modelValue: false, labelId: 'toggle' }
      })
      expect(getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    })
    describe('when a toggle is switched on', () => {
      it('emits an "update:modelValue" event', async () => {
        const { getByRole, emitted } = render(Toggle, {
          props: { modelValue: false, labelId: 'toggle' }
        })
        await userEvent.click(getByRole('button'))
        expect(emitted()['update:modelValue'][0]).toEqual([true])
      })
    })
  })
  describe('when a toggle is on', () => {
    it('applies "aria-pressed=true" to the button', () => {
      const { getByRole } = render(Toggle, {
        props: { modelValue: true, labelId: 'toggle' }
      })
      expect(getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })
    describe('when a toggle is switched off', () => {
      it('emits an "update:modelValue" event', async () => {
        const { getByRole, emitted } = render(Toggle, {
          props: { modelValue: true, labelId: 'toggle' }
        })
        await userEvent.click(getByRole('button'))
        expect(emitted()['update:modelValue'][0]).toEqual([false])
      })
    })
  })
  describe('when a toggle is has a `mixed` value', () => {
    it('applies "aria-pressed=\'mixed\'" to the button', () => {
      const { getByRole } = render(Toggle, {
        props: { modelValue: 'mixed', labelId: 'toggle' }
      })
      expect(getByRole('button')).toHaveAttribute('aria-pressed', 'mixed')
    })
    describe('when a toggle is pressed', () => {
      it('emits an "update:modelValue" event', async () => {
        const { getByRole, emitted } = render(Toggle, {
          props: { modelValue: 'mixed', labelId: 'toggle' }
        })
        await userEvent.click(getByRole('button'))
        expect(emitted()['update:modelValue'][0]).toEqual([false])
      })
    })
  })
})
