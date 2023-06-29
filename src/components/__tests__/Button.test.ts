import { render } from '@testing-library/vue'
import Button from '../Button.vue'

describe('Button.vue', () => {
  describe('when href is not provided', () => {
    it('renders a button element', () => {
      const { getByRole } = render(Button, {
        props: { label: 'Button' }
      })
      expect(getByRole('button')).toBeInTheDocument()
    })
  })
  describe('when href is provided', () => {
    it('renders an anchor element', () => {
      const { getByRole } = render(Button, {
        props: { label: 'button', href: '/' }
      })
      expect(getByRole('link')).toBeInTheDocument()
    })
  })
  describe('when loading is set to true', () => {
    it('disables the button', () => {
      const label = 'Loading'
      const { getByRole } = render(Button, {
        props: { label, loading: true }
      })
      expect(getByRole('button', { name: label })).toHaveAttribute('disabled')
    })
  })
  describe('when pressed is set to true', () => {
    it('applies "aria-pressed=true" to the button', () => {
      const { getByRole } = render(Button, {
        props: { pressed: true }
      })
      expect(getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })
  })
  describe('when the default slot and the "label" prop are present', () => {
    it('sets "aria-label" attribute to the value of the "label" prop', () => {
      const { getByRole } = render(Button, {
        props: { label: 'Label' },
        slots: {
          default: 'Default'
        }
      })
      expect(getByRole('button')).toHaveAttribute('aria-label', 'Label')
      expect(getByRole('button')).toHaveTextContent('Default')
    })
  })
  describe('when the "icon" prop and the "label" prop are present', () => {
    it('sets "aria-label" attribute to the value of the "label" prop', () => {
      const { getByRole } = render(Button, {
        props: { label: 'Label', size: 'md', icon: 'More' }
      })
      expect(getByRole('button')).toHaveAttribute('aria-label', 'Label')
    })
  })
  describe('when the "label" prop is present, but neither the default slot nor the icon is set', () => {
    it('renders the the text label without adding an "aria-label" attribute', () => {
      const { getByRole } = render(Button, {
        props: { label: 'Label' }
      })
      expect(getByRole('button')).not.toHaveAttribute('aria-label')
      expect(getByRole('button')).toHaveTextContent('Label')
    })
  })
})
