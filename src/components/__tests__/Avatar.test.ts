import { render } from '@testing-library/vue'
import Avatar from '../Avatar.vue'

describe('Avatar.vue', () => {
  describe('when mounted with a label prop', () => {
    it('renders only the first letter from the label', () => {
      const { getByText, queryByText } = render(Avatar, {
        props: {
          label: 'Long label'
        }
      })
      getByText('L')
      expect(queryByText('Long label')).toBeFalsy()
    })
  })
  describe('when mounted with the default slot', () => {
    it('renders the whole label', () => {
      const { getByText } = render(Avatar, {
        slots: {
          default: 'Long label'
        }
      })
      getByText('Long label')
    })
  })
})
