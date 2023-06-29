import { render } from '@testing-library/vue'
import Link from '../Link.vue'

describe('Link.vue', () => {
  describe('when href is not provided', () => {
    it('renders a button element', () => {
      const { getByRole } = render(Link, {
        props: { content: 'link' }
      })
      expect(getByRole('button')).toBeInTheDocument()
    })
  })
  describe('when href is provided', () => {
    it('renders an anchor element', () => {
      const { getByRole } = render(Link, {
        props: { content: 'link', href: '/' }
      })
      expect(getByRole('link')).toBeInTheDocument()
    })
  })
})
