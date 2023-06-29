import { render, fireEvent, waitFor } from '@testing-library/vue'
import TableRow from '../TableRow.vue'

const slots = {
  default: `
            <template  #default="{ toggleRow }">
              <td>
                <button @click="toggleRow">toggle</button>
              </td>
            </template>`,
  nested: '<tr><td>nested content</td></tr>'
}
describe('TableRow.vue', () => {
  describe('when nested rows are provided', () => {
    it('does not show nested rows on initial render', () => {
      const table = document.createElement('table')

      const { getByText, queryByText } = render(TableRow, {
        container: document.body.appendChild(table),
        slots
      })
      expect(getByText('toggle')).toBeVisible()
      expect(queryByText('nested content')).not.toBeInTheDocument()
    })
    it('toggles nested rows after button is clicked', async () => {
      const table = document.createElement('table')

      const { getByText, queryByText } = render(TableRow, {
        container: document.body.appendChild(table),
        slots
      })
      await fireEvent.click(getByText('toggle'))
      await waitFor(() => {
        expect(queryByText('nested content')).toBeInTheDocument()
      })

      await fireEvent.click(getByText('toggle'))
      await waitFor(() => {
        expect(queryByText('nested content')).not.toBeInTheDocument()
      })
    })
  })

  describe('row selection', () => {
    describe('when selectId and selectCallback are provided', () => {
      it('calls the select callback on click with selectId and original event', async () => {
        const selectRowCallback = vi.fn()
        const table = document.createElement('table')

        const { getByText } = render(TableRow, {
          container: document.body.appendChild(table),
          props: {
            selectId: 'testId',
            selectRowCallback
          },
          slots: {
            default: `<td>content</td>`
          }
        })

        await fireEvent.click(getByText('content'))

        expect(selectRowCallback).toHaveBeenCalledWith('testId', expect.any(MouseEvent))
      })
      it('calls the select callback on space keyup event with selectId and original event', async () => {
        const selectRowCallback = vi.fn()
        const table = document.createElement('table')

        const { getByRole } = render(TableRow, {
          container: document.body.appendChild(table),
          props: {
            selectId: 'testId',
            selectRowCallback
          },
          slots: {
            default: `<td>content</td>`
          }
        })

        await fireEvent.keyPress(getByRole('row'), { code: 'Space', key: ' ' })

        expect(selectRowCallback).toHaveBeenCalledWith('testId', expect.any(KeyboardEvent))
      })
    })
    describe('when selectId is not provided', () => {
      it('does not call the select callback on click', async () => {
        const selectRowCallback = vi.fn()
        const table = document.createElement('table')

        const { getByText } = render(TableRow, {
          container: document.body.appendChild(table),
          props: {
            selectRowCallback
          },
          slots: {
            default: `<td>content</td>`
          }
        })

        await fireEvent.click(getByText('content'))

        expect(selectRowCallback).not.toHaveBeenCalled()
      })
    })
  })
})
