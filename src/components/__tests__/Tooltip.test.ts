import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import Tooltip from '../Tooltip.vue'
const tooltipId = 'a-tooltip-'

const tooltipPropsAndSlots = {
  props: { content: 'hello' },
  slots: {
    default: `
          <template #default="slotProps">
            <button v-bind="slotProps">hi</button>
          </template>`
  }
}

describe('Tooltip.vue', () => {
  describe('when the tooltip role is "label"', () => {
    it('assigns an "id" to the tooltip element and "aria-labelledby" to the control', () => {
      const { getByRole } = render(Tooltip, { ...tooltipPropsAndSlots })
      expect(getByRole('button')).toHaveAttribute(
        'aria-labelledBy',
        expect.stringContaining(tooltipId)
      )
      expect(getByRole('tooltip')).toHaveAttribute('id', expect.stringContaining(tooltipId))
    })
  })
  describe('when the tooltip role is "description"', () => {
    it('assigns an "id" to the tooltip element and "aria-labelledby" to the control', () => {
      const { getByRole } = render(Tooltip, {
        ...tooltipPropsAndSlots,
        props: { content: 'hello', role: 'description' }
      })

      expect(getByRole('button')).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(tooltipId)
      )
      expect(getByRole('tooltip')).toHaveAttribute('id', expect.stringContaining(tooltipId))
    })
  })

  describe('when a control is hovered', () => {
    it('hides tooltip on mouseleave', async () => {
      const user = userEvent.setup()
      const { getByRole } = render(Tooltip, { ...tooltipPropsAndSlots })

      expect(getByRole('tooltip')).toHaveClass('invisible')
      await user.hover(getByRole('button'))
      expect(getByRole('tooltip')).toHaveClass('visible')
      await user.unhover(getByRole('button'))
      expect(getByRole('tooltip')).toHaveClass('invisible')
    })
  })
  describe('when a control is focused', () => {
    it('hides tooltip on blur', async () => {
      const user = userEvent.setup()
      const { getByRole } = render(Tooltip, { ...tooltipPropsAndSlots })

      expect(getByRole('tooltip')).toHaveClass('invisible')
      await user.tab()
      expect(getByRole('tooltip')).toHaveClass('visible')
      await user.tab()
      expect(getByRole('tooltip')).toHaveClass('invisible')
    })
    it('hides tooltip on esc', async () => {
      const user = userEvent.setup()
      const { getByRole } = render(Tooltip, { ...tooltipPropsAndSlots })

      expect(getByRole('tooltip')).toHaveClass('invisible')
      await user.tab()
      expect(getByRole('tooltip')).toHaveClass('visible')
      await user.keyboard('{Esc}')
      expect(getByRole('tooltip')).toHaveClass('invisible')
    })
  })
})
