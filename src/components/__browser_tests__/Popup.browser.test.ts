import { render } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'

import Popup from '../Popup.vue'

// The element after the popup is an <input> on purpose: WebKit keeps buttons
// and links out of the tab order by default (macOS full-keyboard-access), so a
// trailing <button> would simply never be tabbed to there.
const PopupHost = {
  components: { Popup },
  template: `
    <div>
      <Popup>
        <template #button><button aria-haspopup="true">Open popup</button></template>
        <template #default>
          <div>
            <p>Test popup</p>
            <button>OK</button>
          </div>
        </template>
      </Popup>
      <input aria-label="Outside" />
    </div>
  `
}

describe('Popup', () => {
  // WebKit does not focus a <button> when it is clicked, so opening the popup
  // rests entirely on the component's own focusable()+focus() call rather than
  // on the click having left focus somewhere useful.
  it('moves focus to the first focusable item in the panel when opened by a real click', async () => {
    const { getByRole } = render(PopupHost)

    await userEvent.click(getByRole('button', { name: 'Open popup' }))

    expect(getByRole('button', { name: 'OK' })).toHaveFocus()
  })

  // closeOnTabOut() reads event.relatedTarget, which only a real focus event
  // populates — jsdom's synthetic events leave that path untested.
  it('closes when a real Tab moves focus out of the popup', async () => {
    const { getByRole, queryByText } = render(PopupHost)
    await userEvent.click(getByRole('button', { name: 'Open popup' }))
    expect(getByRole('button', { name: 'OK' })).toHaveFocus()

    await userEvent.tab()

    expect(getByRole('textbox', { name: 'Outside' })).toHaveFocus()
    expect(queryByText('Test popup')).not.toBeInTheDocument()
  })
})
