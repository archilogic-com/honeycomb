import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Toast from '../Toast.vue'
import { vi } from 'vitest'

describe('Toast.vue', () => {
  const defaultToast = {
    slots: {
      default: `toast`
    }
  }

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  describe('when mounted', () => {
    it('renders the toast with the text', () => {
      const renderResult = render(Toast, defaultToast)
      expect(renderResult.getByText('toast')).toBeTruthy()
    })

    describe('then 5s pass (default timeout)', () => {
      it('does not emit the "dismiss" event yet', () => {
        const { emitted } = render(Toast, defaultToast)
        vi.advanceTimersByTime(5000) // default timeout
        expect(emitted()['dismiss']).toBeUndefined()
      })

      describe('then another 300ms pass (transition duration)', () => {
        it('emits the "dismiss" event', () => {
          const { emitted } = render(Toast, defaultToast)
          vi.advanceTimersByTime(5300) // default timeout + transition
          expect(emitted()['dismiss']).toBeTruthy()
        })
      })
    })

    describe('then the close button is clicked', () => {
      it('does not emit the "dismiss" event yet', async () => {
        const user = userEvent.setup({
          advanceTimers: () => vi.advanceTimersByTime(0)
        })
        const { getByRole, emitted } = render(Toast, defaultToast)
        await user.click(getByRole('button'))
        expect(emitted()['dismiss']).toBeUndefined()
      })

      describe('then another 300ms pass (transition duration)', () => {
        it('emits the "dismiss" event', async () => {
          const user = userEvent.setup({
            advanceTimers: () => vi.advanceTimersByTime(0)
          })
          const { getByRole, emitted } = render(Toast, defaultToast)
          await user.click(getByRole('button'))
          vi.advanceTimersByTime(300)
          expect(emitted()['dismiss']).toBeTruthy()
        })
      })
    })
  })
})
