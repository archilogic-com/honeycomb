import { render } from '@testing-library/vue'
import { userEvent } from 'vitest/browser'

import Dialog from '../Dialog.vue'

// Inputs rather than buttons: WebKit leaves buttons out of the tab order by
// default, so a button-only dialog gives Tab nothing to move between there.
const DialogHost = {
  components: { Dialog },
  template: `
    <div>
      <input id="outside-before" aria-label="Outside before" />
      <Dialog open title="Test dialog">
        <template #body>
          <input id="first-in-dialog" aria-label="First" />
          <input aria-label="Second" />
        </template>
        <template #actions><input id="last-in-dialog" aria-label="Confirm" /></template>
      </Dialog>
      <input id="outside-after" aria-label="Outside after" />
    </div>
  `
}

const getDialog = () => document.querySelector('[role="dialog"]') as HTMLElement

describe('Dialog', () => {
  // The panel is `display: contents`, so it has no box of its own and Headless
  // UI has to ask the browser what is focusable inside it. The jsdom suite
  // disables that visibility check wholesale to get this far.
  it('puts initial focus inside the panel', async () => {
    render(DialogHost)

    await vi.waitFor(() => {
      expect(getDialog()).toBeInTheDocument()
      expect(getDialog().contains(document.activeElement)).toBe(true)
    })
  })

  it('wraps real Tab presses back into the panel instead of onto the page behind it', async () => {
    render(DialogHost)
    await vi.waitFor(() => expect(getDialog()).toBeInTheDocument())

    // focused directly rather than clicked: WebKit does not focus on click
    const last = document.getElementById('last-in-dialog') as HTMLInputElement
    last.focus()
    expect(last).toHaveFocus()

    // Past the last focusable in the panel. Chromium wraps straight onto the
    // Close button; WebKit skips it (buttons are out of its tab order) and
    // parks on <body> for one press — so assert only what holds in both: the
    // inert page behind the dialog never receives focus.
    await userEvent.tab()
    expect(document.getElementById('outside-after')).not.toHaveFocus()
    expect(document.getElementById('outside-before')).not.toHaveFocus()

    await userEvent.tab()
    expect(document.getElementById('first-in-dialog')).toHaveFocus()
  })
})
