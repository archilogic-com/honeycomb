import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import ArrowKeyFocusable from '../ArrowKeyFocusable.vue'

const propsDefault = { as: 'ul' }
const propsHorizontal = { as: 'ul', direction: 'horizontal' }
const slotContent = {
  default: `
      <li>title</li>
      <li tabindex="-1">1</li>
      <li><hr/></li>
      <li tabindex="-1">2</li>
      <li tabindex="-1">3</li>
      <li>footer</li>
    `
}

const componentParamsDefault = { props: propsDefault, slots: slotContent }
const componentParamsHorizontal = { props: propsHorizontal, slots: slotContent }

describe('ArrowKeyFocusable.vue', () => {
  it('creates a container rendered as the specified element', () => {
    const { getByRole } = render(ArrowKeyFocusable, componentParamsDefault)
    expect(getByRole('list')).toBeInTheDocument()
  })
  it('renders children in a default slot', () => {
    const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
  })

  describe('when container receives focus', () => {
    it('focuses the first focusable child', async () => {
      const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
      await userEvent.tab()
      expect(getByText('1')).toHaveFocus()
    })

    it('has one tab stop', async () => {
      const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
      await userEvent.tab()
      expect(getByText('1')).toHaveFocus()
      await userEvent.tab()
      expect(document.body).toHaveFocus()
    })

    it('can be tabbed out of with shift+tab', async () => {
      const { getByText, getByRole } = render(ArrowKeyFocusable, componentParamsDefault)
      await userEvent.tab()
      expect(getByText('1')).toHaveFocus()
      await userEvent.tab({ shift: true })
      expect(getByRole('list')).toHaveFocus()
      await userEvent.tab({ shift: true })
      expect(document.body).toHaveFocus()
    })

    describe('and a child was previously focused by keyboard navigation', () => {
      it('focuses the last focused child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.tab()
        await userEvent.keyboard(`{ArrowDown}`)
        expect(getByText('2')).toHaveFocus()
        await userEvent.tab()
        expect(getByText('2')).not.toHaveFocus()
        await userEvent.tab({ shift: true })
        expect(getByText('2')).toHaveFocus()
      })
      it('continues the arrow navigation from the last focused child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.tab()
        await userEvent.keyboard(`{ArrowDown}`)
        await userEvent.tab()
        await userEvent.tab({ shift: true })
        await userEvent.keyboard(`{ArrowDown}`)
        expect(getByText('3')).toHaveFocus()
      })
    })
    describe('and a child was previously focused by mouse navigation', () => {
      it('focuses the last focused child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.click(getByText('2'))
        expect(getByText('2')).toHaveFocus()
        await userEvent.tab()
        expect(getByText('2')).not.toHaveFocus()
        await userEvent.tab({ shift: true })
        expect(getByText('2')).toHaveFocus()
      })
      it('continues the arrow navigation from the last focused child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.click(getByText('2'))
        await userEvent.keyboard(`{ArrowDown}`)
        expect(getByText('3')).toHaveFocus()
      })
    })

    describe('and Home is pressed', () => {
      it('focuses the first focusable child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.click(getByText('2'))
        await userEvent.keyboard('{Home}')
        expect(getByText('1')).toHaveFocus()
      })
    })
    describe('and End is pressed', () => {
      it('focuses the last focusable child', async () => {
        const { getByText } = render(ArrowKeyFocusable, componentParamsDefault)
        await userEvent.click(getByText('2'))
        await userEvent.keyboard('{End}')
        expect(getByText('3')).toHaveFocus()
      })
    })

    const keyConfigs = [
      {
        direction: 'vertical',
        next: 'ArrowDown',
        previous: 'ArrowUp',
        params: componentParamsDefault
      },
      {
        direction: 'horizontal',
        next: 'ArrowRight',
        previous: 'ArrowLeft',
        params: componentParamsHorizontal
      }
    ]

    keyConfigs.forEach(config => {
      describe(`with navigation direction set to ${config.direction}`, () => {
        describe(`and ${config.next} is pressed`, () => {
          it('focuses the next child', async () => {
            const { getByText } = render(ArrowKeyFocusable, config.params)
            await userEvent.tab()
            await userEvent.keyboard(`{${config.next}}`)
            expect(getByText('2')).toHaveFocus()
          })
          describe('and the last child is focused', () => {
            it('focuses the first focusable child', async () => {
              const { getByText } = render(ArrowKeyFocusable, config.params)
              await userEvent.click(getByText('3'))
              await userEvent.keyboard(`{${config.next}}`)
              expect(getByText('1')).toHaveFocus()
            })
          })
        })
        describe(`and ${config.previous} is pressed`, () => {
          it('focuses the previous focusable child', async () => {
            const { getByText } = render(ArrowKeyFocusable, config.params)
            await userEvent.click(getByText('2'))
            await userEvent.keyboard(`{${config.previous}}`)
            expect(getByText('1')).toHaveFocus()
          })
          describe('and the first child is focused', () => {
            it('focuses the last focusable child', async () => {
              const { getByText } = render(ArrowKeyFocusable, config.params)
              await userEvent.click(getByText('1'))
              await userEvent.keyboard(`{${config.previous}}`)
              expect(getByText('3')).toHaveFocus()
            })
          })
        })
      })
    })
  })
})
