import { render } from '@testing-library/vue'
import KeyboardShortcut from '../KeyboardShortcut.vue'

vi.mock('@archilogic/toolbox', async importOriginal => {
  const toolbox = await importOriginal<typeof import('@archilogic/toolbox')>()
  return {
    ...toolbox,
    isMac: false
  }
})
describe('KeyboardShortcut', () => {
  describe('when given a single shortcut', () => {
    it('renders the shortcut', () => {
      const { getByText } = render(KeyboardShortcut, {
        props: { shortcut: { keySequence: 'a' } }
      })
      expect(getByText('A')).toBeTruthy()
    })
  })

  describe('when given several shortcuts', () => {
    it('renders the shortcuts, separated by "or"s', () => {
      const { getByText, queryAllByText } = render(KeyboardShortcut, {
        props: { shortcut: [{ keySequence: 'a' }, { keySequence: 'b' }, { keySequence: 'c' }] }
      })
      expect(getByText('A')).toBeTruthy()
      expect(getByText('B')).toBeTruthy()
      expect(getByText('C')).toBeTruthy()
      expect(queryAllByText('or').length).toEqual(2)
    })
  })

  it('renders a "ctrl" modifier key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { modifiers: ['ctrl'] } }
    })

    expect(getByText('Ctrl')).toBeTruthy()
  })

  it('renders a "shift" modifier key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { modifiers: ['shift'] } }
    })
    expect(getByText('⇧')).toBeTruthy()
  })

  it('renders a "backspace" key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: 'backspace' } }
    })
    expect(getByText('⌫')).toBeTruthy()
  })

  it('renders a "delete" key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: 'delete' } }
    })
    expect(getByText('Delete')).toBeTruthy()
  })

  it('renders a "space" key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: ' ' } }
    })
    expect(getByText('Space')).toBeTruthy()
  })

  it('renders an "escape" key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: 'escape' } }
    })
    expect(getByText('Esc')).toBeTruthy()
  })

  it('renders an "enter" key', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: 'enter' } }
    })
    expect(getByText('↵')).toBeTruthy()
  })

  it('renders a key or key sequence in upper case', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { keySequence: 'wa' } }
    })
    expect(getByText('WA')).toBeTruthy()
  })

  it('renders a mouse event', () => {
    const { getByText } = render(KeyboardShortcut, {
      props: { shortcut: { mouseEvent: 'click' } }
    })
    expect(getByText('click')).toBeTruthy()
  })

  describe('when not on Mac', () => {
    it('renders an "alt" modifier key', () => {
      const { getByText } = render(KeyboardShortcut, {
        props: { shortcut: { modifiers: ['alt'] } }
      })
      expect(getByText('Alt')).toBeTruthy()
    })

    it('renders a "meta" modifier key', () => {
      const { getByText } = render(KeyboardShortcut, {
        props: { shortcut: { modifiers: ['meta'] } }
      })
      expect(getByText('⊞')).toBeTruthy()
    })
  })
})
