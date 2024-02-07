import { render } from '@testing-library/vue'
import KeyboardShortcut from '../KeyboardShortcut.vue'

vi.mock('@archilogic/toolbox', async importOriginal => {
  const toolbox = await importOriginal<typeof import('@archilogic/toolbox')>()
  return {
    ...toolbox,
    isMac: true
  }
})

describe('when on Mac', () => {
  it('renders a Mac "alt" modifier key', async () => {
    const KeyboardShortcutMocked = await import('../KeyboardShortcut.vue')
    const { getByText } = render(KeyboardShortcutMocked.default, {
      props: { shortcut: { modifiers: ['alt'] } }
    })
    expect(getByText('⌥')).toBeTruthy()
  })

  it('renders a Mac "meta" modifier key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { modifiers: ['meta'] } }
    })
    expect(getByText('⌘')).toBeTruthy()
  })
})
