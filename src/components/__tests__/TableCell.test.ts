import { render, fireEvent } from '@testing-library/vue'
import TableCell from '../TableCell.vue'

describe('TableCell.vue', () => {
  let table: HTMLTableElement
  beforeEach(() => {
    table = document.createElement('table')
    const tr = document.createElement('tr')
    table.appendChild(tr)
  })
  describe('when `expanded` prop is not provided', () => {
    it('does not render a toggle button', () => {
      const { queryByTitle } = render(TableCell, {
        container: document.body.appendChild(table),
        slots: {
          default: `cell content`
        }
      })
      expect(queryByTitle('Toggle Row')).not.toBeInTheDocument()
    })
  })
  describe('when `expanded` prop is provided', () => {
    it('shows a collapse button when `expanded` is true', () => {
      const { getByTitle } = render(TableCell, {
        container: document.body.appendChild(table),
        props: {
          expanded: true
        },
        slots: {
          default: `cell content`
        }
      })
      expect(getByTitle('Toggle Row')).toHaveAttribute('aria-label', 'collapse')
    })

    it('shows an expand button when `expanded` is false', () => {
      const { getByTitle } = render(TableCell, {
        container: document.body.appendChild(table),
        props: {
          expanded: false
        },
        slots: {
          default: `cell content`
        }
      })
      expect(getByTitle('Toggle Row')).toHaveAttribute('aria-label', 'expand')
    })

    it('executes a callback on toggle button click', async () => {
      const toggleCallback = vi.fn()
      const { getByTitle } = render(TableCell, {
        container: document.body.appendChild(table),
        props: {
          expanded: false,
          toggleCallback
        },
        slots: {
          default: `cell content`
        }
      })
      await fireEvent.click(getByTitle('Toggle Row'))

      expect(toggleCallback).toHaveBeenCalled()
    })
  })
})
