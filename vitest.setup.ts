import { vi } from 'vitest'
import '@testing-library/jest-dom'

import Tabbable from 'tabbable'

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn()
}))

//github.com/focus-trap/tabbable#testing-in-jsdom
vi.mock('tabbable', async (): Promise<typeof Tabbable> => {
  const tabbable: typeof Tabbable = await vi.importActual('tabbable')
  return {
    ...tabbable,
    tabbable: (node: Element, options) =>
      tabbable.tabbable(node, { ...options, displayCheck: 'none' }),
    focusable: (node, options) => tabbable.focusable(node, { ...options, displayCheck: 'none' }),
    isFocusable: (node, options) =>
      tabbable.isFocusable(node, { ...options, displayCheck: 'none' }),
    isTabbable: (node, options) => tabbable.isTabbable(node, { ...options, displayCheck: 'none' })
  }
})

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
