import { nextTick } from 'vue'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import Menu from '../AppMenu.vue'

const menuSlots = {
  'menu-button': `<button aria-haspopup="true">menu</button>`,
  default: `
  <li tabindex="-1" role="menuitem">item 1</li>
  <li tabindex="-1" role="menuitem">item 2</li>
  <li tabindex="-1" role="menuitem">item 3</li>
  `
}

describe('AppMenu', () => {
  describe('when the `open` prop is set to false (default)', () => {
    it('does not render the menu', () => {
      const { queryByRole } = render(Menu, {
        slots: menuSlots
      })
      expect(queryByRole('menu')).not.toBeInTheDocument()
    })
  })
  describe('when the `open` prop is set to true', () => {
    it('renders the menu', async () => {
      const { queryByRole } = render(Menu, {
        props: {
          open: true
        },
        slots: menuSlots
      })
      await nextTick()
      expect(queryByRole('menu')).toBeInTheDocument()
    })
  })
  describe('when the menu is opened', () => {
    it('places focus on the first menu item', async () => {
      const { getByRole, getAllByRole } = render(Menu, {
        slots: menuSlots
      })
      await userEvent.click(getByRole('button'))
      expect(getByRole('menu')).toBeInTheDocument()
      expect(getAllByRole('menuitem')[0]).toHaveFocus()
    })
    it('enables arrow key navigation within menu', async () => {
      const { getByRole, getAllByRole } = render(Menu, {
        slots: menuSlots
      })
      await userEvent.click(getByRole('button'))
      await userEvent.keyboard('{ArrowDown}')
      expect(getAllByRole('menuitem')[1]).toHaveFocus()
    })
    describe('and a menu item is activated', () => {
      it('closes the menu and returns focus to menu button', async () => {
        const { queryByRole, getByRole, getAllByRole } = render(Menu, {
          slots: menuSlots
        })
        await userEvent.click(getByRole('button'))
        await userEvent.click(getAllByRole('menuitem')[2])
        expect(queryByRole('menu')).not.toBeInTheDocument()
        expect(getByRole('button')).toHaveFocus()
      })
    })
    describe('and the menu button is pressed again', () => {
      it('closes the menu', async () => {
        const { getByRole, queryByRole } = render(Menu, {
          slots: menuSlots
        })
        await userEvent.click(getByRole('button'))
        expect(queryByRole('menu')).toBeInTheDocument()
        await userEvent.click(getByRole('button'))
        expect(queryByRole('menu')).not.toBeInTheDocument()
      })
    })
    describe('and the user clicks outside', () => {
      it('closes the menu', async () => {
        const { queryByRole, getByRole } = render(Menu, {
          slots: menuSlots
        })
        await userEvent.click(getByRole('button'))
        await userEvent.click(document.body)
        expect(queryByRole('menu')).not.toBeInTheDocument()
      })
    })
    describe('and the "Escape" key is pressed', () => {
      it('closes the menu and returns focus to menu button', async () => {
        const { queryByRole, getByRole } = render(Menu, {
          slots: menuSlots
        })
        await userEvent.click(getByRole('button'))
        await userEvent.keyboard('{Esc}')
        expect(queryByRole('menu')).not.toBeInTheDocument()
        expect(getByRole('button')).toHaveFocus()
      })
    })
    describe('and the "Tab" key is pressed', () => {
      it('closes the menu and focuses the next element in the tab order', async () => {
        const { queryByRole, getByRole } = render(Menu, {
          slots: menuSlots
        })
        await userEvent.click(getByRole('button'))
        await userEvent.tab()
        expect(queryByRole('menu')).not.toBeInTheDocument()
        expect(document.body).toHaveFocus()
      })
    })
  })
})
