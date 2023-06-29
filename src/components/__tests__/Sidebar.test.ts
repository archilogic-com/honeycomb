import { render, fireEvent } from '@testing-library/vue'

import Sidebar from '../Sidebar.vue'

describe('Sidebar.vue', () => {
  describe('when `as` prop is not provided', () => {
    it('renders an `aside` element', () => {
      const { getByRole } = render(Sidebar)
      expect(getByRole('complementary')).toBeInTheDocument()
    })
  })
  describe('when `as` prop is provided', () => {
    it('renders a specified element', () => {
      const { getByRole } = render(Sidebar, {
        props: {
          as: 'nav'
        }
      })
      expect(getByRole('navigation')).toBeInTheDocument()
    })
  })
  describe('when `resizable` is true', () => {
    it('renders a resizing bar', () => {
      const { getByRole } = render(Sidebar, {
        props: {
          resizable: true
        }
      })
      expect(getByRole('separator')).toBeInTheDocument()
    })
    describe('when the resizing bar is moved', () => {
      it('resizes left sidebar', async () => {
        const { getByRole } = render(Sidebar, {
          props: {
            resizable: true
          },
          slots: {
            default: `sidebar`
          }
        })
        const resizeBar = getByRole('separator')
        const sidebar = getByRole('complementary')
        // mock these values because jsdom always returns zeros
        sidebar.getBoundingClientRect = () => ({
          left: 0,
          right: 120,
          top: 0,
          bottom: 0,
          width: 120,
          height: 0,
          x: 0,
          y: 0,
          toJSON: vi.fn()
        })

        await fireEvent(resizeBar, new MouseEvent('mousedown'))
        await fireEvent(document, new MouseEvent('mousemove', { clientX: 250 }))
        await fireEvent(document, new MouseEvent('mouseup'))
        expect(window.getComputedStyle(sidebar).width).toBe('250px')

        await fireEvent(resizeBar, new MouseEvent('mousedown'))
        await fireEvent(document, new MouseEvent('mousemove', { clientX: 100 }))
        await fireEvent(document, new MouseEvent('mouseup'))
        expect(window.getComputedStyle(sidebar).width).toBe('100px')
      })
      it('resizes right sidebar', async () => {
        const { getByRole } = render(Sidebar, {
          props: {
            resizable: true,
            side: 'right'
          },
          slots: {
            default: `sidebar`
          }
        })
        const resizeBar = getByRole('separator')
        const sidebar = getByRole('complementary')

        // mock these values because jsdom always returns zeros
        sidebar.getBoundingClientRect = () => ({
          left: 1540,
          right: 1600,
          top: 0,
          bottom: 0,
          width: 160,
          height: 0,
          x: 1540,
          y: 0,
          toJSON: vi.fn()
        })

        await fireEvent(resizeBar, new MouseEvent('mousedown'))
        await fireEvent(document, new MouseEvent('mousemove', { clientX: 1250 }))
        await fireEvent(document, new MouseEvent('mouseup'))
        expect(window.getComputedStyle(sidebar).width).toBe('350px')

        await fireEvent(resizeBar, new MouseEvent('mousedown'))
        await fireEvent(document, new MouseEvent('mousemove', { clientX: 1500 }))
        await fireEvent(document, new MouseEvent('mouseup'))
        expect(window.getComputedStyle(sidebar).width).toBe('100px')
      })
      it('switches cursor to "col-resize" and back', async () => {
        const { getByRole } = render(Sidebar, {
          props: {
            resizable: true
          },
          slots: {
            default: `sidebar`
          }
        })
        const resizeBar = getByRole('separator')

        await fireEvent(resizeBar, new MouseEvent('mousedown'))
        await fireEvent(document, new MouseEvent('mousemove', { clientX: 100 }))
        expect(window.getComputedStyle(document.body).cursor).toBe('col-resize')

        await fireEvent(document, new MouseEvent('mouseup'))
        expect(window.getComputedStyle(document.body).cursor).toBe('auto')
      })
    })
  })
})
