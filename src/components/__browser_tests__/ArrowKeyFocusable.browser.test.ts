import { render } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'

import ArrowKeyFocusable from '../ArrowKeyFocusable.vue'

const componentParams = {
  props: { as: 'ul' },
  slots: {
    default: `
      <li>title</li>
      <li tabindex="-1">1</li>
      <li><hr/></li>
      <li tabindex="-1">2</li>
      <li tabindex="-1">3</li>
      <li>footer</li>
    `
  }
}

describe('ArrowKeyFocusable', () => {
  // Roving tabindex driven by real focus and key events: the browser decides
  // what is focusable and where a real Tab lands, and <li tabindex="-1">
  // focusability is exactly what the jsdom suite has to patch tabbable for.
  it('traverses focusable children with real arrow keys', async () => {
    const { getByText } = render(ArrowKeyFocusable, componentParams)

    // the container is tabindex="0" — a real tab stop in both engines
    await userEvent.tab()
    expect(getByText('1')).toHaveFocus()

    await userEvent.keyboard('{ArrowDown}')
    expect(getByText('2')).toHaveFocus()
    expect(getByText('2')).toHaveAttribute('tabindex', '0')
    expect(getByText('1')).toHaveAttribute('tabindex', '-1')

    await userEvent.keyboard('{ArrowUp}')
    expect(getByText('1')).toHaveFocus()

    // wraps past the first focusable child round to the last one
    await userEvent.keyboard('{ArrowUp}')
    expect(getByText('3')).toHaveFocus()
  })
})
