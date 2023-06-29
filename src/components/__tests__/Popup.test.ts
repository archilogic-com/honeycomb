import { nextTick } from 'vue'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import Popup from '../Popup.vue'

const popupSlots = {
  button: `<button aria-haspopup="true">Open popup</button>`,
  default: `
  <div>
    <p>Test popup</p>
    <button>OK</button>
  </div> 
  `
}

describe('Popup', () => {
  describe('when the `open` prop is set to false (default)', () => {
    it('does not render the popup', () => {
      const { queryByText } = render(Popup, {
        slots: popupSlots
      })
      expect(queryByText('Test popup')).not.toBeInTheDocument()
    })
  })
  describe('when the `open` prop is set to true', () => {
    it('renders the popup', async () => {
      const { getByText } = render(Popup, {
        slots: popupSlots,
        props: {
          open: true
        }
      })
      await nextTick()
      expect(getByText('Test popup')).toBeInTheDocument()
    })
  })
  describe('when user opens the popup', () => {
    describe('and the popup contains focusable items', () => {
      it('sets the focus on the first focusable item', async () => {
        const { getByRole } = render(Popup, {
          slots: popupSlots
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        expect(getByRole('button', { name: 'OK' })).toHaveFocus()
      })
    })
    describe('and the popup does not contain focusable items', () => {
      it('keeps the focus on the popup button', async () => {
        const { getByRole } = render(Popup, {
          slots: {
            ...popupSlots,
            default: `<p>Hello World</p>`
          }
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        expect(getByRole('button', { name: 'Open popup' })).toHaveFocus()
      })
    })
    describe('and the popup button is pressed again', () => {
      it('closes the popup', async () => {
        const { getByRole, queryByText } = render(Popup, {
          slots: popupSlots
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        expect(queryByText('Test popup')).not.toBeInTheDocument()
      })
    })
    describe('and the user clicks inside the popup panel', () => {
      it('does not close the popup', async () => {
        const { getByRole, getByText } = render(Popup, {
          slots: popupSlots
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        await userEvent.click(getByRole('button', { name: 'OK' }))
        expect(getByText('Test popup')).toBeInTheDocument()
      })
    })
    describe('and the user clicks outside', () => {
      it('closes the popup', async () => {
        const { getByRole, queryByText } = render(Popup, {
          slots: popupSlots
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        await userEvent.click(document.body)
        expect(queryByText('Test popup')).not.toBeInTheDocument()
      })
    })
    describe('and the "Escape" key is pressed', () => {
      it('closes the popup and returns focus to popup button', async () => {
        const { queryByText, getByRole } = render(Popup, {
          slots: popupSlots
        })
        await userEvent.click(getByRole('button', { name: 'Open popup' }))
        await userEvent.keyboard('{Esc}')
        expect(queryByText('Test popup')).not.toBeInTheDocument()
        expect(getByRole('button', { name: 'Open popup' })).toHaveFocus()
      })
    })
  })
})
