import { nextTick } from 'vue'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import MenuItem from '../AppMenuItem.vue'

const menuItemSlots = {
  default: 'MenuItem',
  submenu: `
  <li tabindex="-1" role="menuitem">subitem 1</li>
  <li tabindex="-1" role="menuitem">subitem 2</li>
  `
}

describe('AppMenuItem', () => {
  describe('when menu item has a submenu', () => {
    it('does not render the submenu on initial render', () => {
      const { queryByText } = render(MenuItem, {
        slots: menuItemSlots
      })
      expect(queryByText('subitem 1')).not.toBeInTheDocument()
    })
    describe('and the item is hovered over', () => {
      it('opens the submenu', async () => {
        const { getByText } = render(MenuItem, {
          slots: menuItemSlots
        })
        await userEvent.hover(getByText('MenuItem'))
        expect(getByText('subitem 1')).toBeInTheDocument()
      })
      it('does not place focus on the submenu', async () => {
        const { getByText } = render(MenuItem, {
          slots: menuItemSlots
        })
        await userEvent.hover(getByText('MenuItem'))
        expect(getByText('subitem 1')).not.toHaveFocus()
      })
      it('keeps the menu open if the mouse moves away', async () => {
        const { getByText, queryByText } = render(MenuItem, {
          slots: menuItemSlots
        })
        await userEvent.hover(getByText('MenuItem'))
        await userEvent.unhover(getByText('MenuItem'))
        expect(queryByText('subitem 1')).toBeInTheDocument()
      })
    })
    const interactions = [
      {
        name: 'mouse click',
        action: async (item: HTMLElement) => {
          await userEvent.click(item)
          await userEvent.unhover(item)
        }
      },
      {
        name: 'Space key',
        action: async (item: HTMLElement) => {
          item.tabIndex = 0
          item.focus()
          await userEvent.keyboard('[Space]')
        }
      },
      {
        name: 'Enter key',
        action: async (item: HTMLElement) => {
          item.tabIndex = 0
          item.focus()
          await userEvent.keyboard('{Enter}')
        }
      },
      {
        name: 'ArrowRight key',
        action: async (item: HTMLElement) => {
          item.tabIndex = 0
          item.focus()
          await userEvent.keyboard('{ArrowRight}')
        }
      }
    ]
    interactions.forEach(interaction => {
      describe(`and the item is activated via ${interaction.name}`, () => {
        it('opens the submenu and places focus on the first item', async () => {
          const { getByText } = render(MenuItem, {
            slots: menuItemSlots
          })
          await interaction.action(getByText('MenuItem'))
          expect(getByText('subitem 1')).toHaveFocus()
        })
        it('enables arrow key navigation within the submenu', async () => {
          const { getByText } = render(MenuItem, {
            slots: menuItemSlots
          })
          await interaction.action(getByText('MenuItem'))
          await userEvent.keyboard('{ArrowDown}')
          expect(getByText('subitem 2')).toHaveFocus()
        })
        describe('and then "ArrowLeft" is pressed', async () => {
          it('closes the submenu and returns focus to menu item', async () => {
            const { getByText, queryByText, getByRole } = render(MenuItem, {
              slots: menuItemSlots
            })
            await interaction.action(getByText('MenuItem'))
            await userEvent.keyboard('{ArrowLeft}')
            expect(queryByText('subitem 1')).not.toBeInTheDocument()
            expect(getByRole('menuitem', { name: 'MenuItem' })).toHaveFocus()
          })
        })
      })
    })
    describe('when the `open` prop is set to true', () => {
      it('renders the submenu on initial render', async () => {
        const { queryByText } = render(MenuItem, {
          props: {
            open: true
          },
          slots: menuItemSlots
        })
        await nextTick()
        expect(queryByText('subitem 1')).toBeInTheDocument()
      })
    })
  })
})
