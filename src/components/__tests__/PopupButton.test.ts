import { render } from '@testing-library/vue'

import PopupButton from '../PopupButton.vue'

//www.w3.org/WAI/ARIA/apg/patterns/menu-button/
describe('PopupButton', () => {
  it('should render a button element', () => {
    const { getByRole } = render(PopupButton, {
      props: { label: 'Open', open: false }
    })
    expect(getByRole('button')).toBeInTheDocument()
  })
  it('should have "aria-haspopup" attribute', () => {
    const { getByRole } = render(PopupButton, {
      props: { label: 'Open', open: false }
    })
    expect(getByRole('button')).toHaveAttribute('aria-haspopup', 'true')
  })
  describe('when "open" is set to false', () => {
    it('should not have "aria-expanded" attribute set', () => {
      const { getByRole } = render(PopupButton, {
        props: { label: 'Open', open: false }
      })
      expect(getByRole('button')).not.toHaveAttribute('aria-expanded')
    })
  })
  describe('when "open" is set to true', () => {
    it('should have "aria-expanded" attribute set to true', () => {
      const { getByRole } = render(PopupButton, {
        props: { label: 'Open', open: true }
      })
      expect(getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
