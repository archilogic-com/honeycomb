import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import CheckboxSelectAll from '../CheckboxSelectAll.vue'

describe('CheckboxSelectAll.vue', () => {
  describe('rendering', () => {
    it('renders a checkbox', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 }
      })
      expect(getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with default label "Select All" when no label or slot provided', () => {
      const { getByLabelText } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 }
      })
      expect(getByLabelText('Select All')).toBeInTheDocument()
    })

    it('renders with custom label prop', () => {
      const { getByLabelText } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5, label: 'Select all items' }
      })
      expect(getByLabelText('Select all items')).toBeInTheDocument()
    })

    it('renders slot content instead of label prop when both provided', () => {
      const { getByText, queryByText } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5, label: 'Label Prop' },
        slots: { default: '<span>Custom Slot Content</span>' }
      })
      expect(getByText('Custom Slot Content')).toBeInTheDocument()
      expect(queryByText('Label Prop')).not.toBeInTheDocument()
    })

    it('renders complex slot content with markup', () => {
      const { getByText } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 },
        slots: { default: '<strong>Bold Label</strong>' }
      })
      expect(getByText('Bold Label').tagName).toBe('STRONG')
    })
  })

  describe('checkbox state', () => {
    it('is unchecked when selectedSize is 0', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 }
      })
      expect(getByRole('checkbox')).not.toBeChecked()
    })

    it('is checked when selectedSize equals itemsSize', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 5, itemsSize: 5 }
      })
      expect(getByRole('checkbox')).toBeChecked()
    })

    it('is indeterminate when selectedSize is between 0 and itemsSize', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 2, itemsSize: 5 }
      })
      const checkbox = getByRole('checkbox') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })
  })

  describe('events', () => {
    it('emits "select" when unchecked checkbox is clicked', async () => {
      const { getByRole, emitted } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 }
      })
      await userEvent.click(getByRole('checkbox'))
      expect(emitted().select).toBeTruthy()
      expect(emitted().select).toHaveLength(1)
    })

    it('emits "clear" when checked checkbox is clicked', async () => {
      const { getByRole, emitted } = render(CheckboxSelectAll, {
        props: { selectedSize: 5, itemsSize: 5 }
      })
      await userEvent.click(getByRole('checkbox'))
      expect(emitted().clear).toBeTruthy()
      expect(emitted().clear).toHaveLength(1)
    })

    it('emits "select" when indeterminate checkbox is clicked', async () => {
      const { getByRole, emitted } = render(CheckboxSelectAll, {
        props: { selectedSize: 2, itemsSize: 5 }
      })
      await userEvent.click(getByRole('checkbox'))
      expect(emitted().select).toBeTruthy()
    })
  })

  describe('edge cases', () => {
    it('handles itemsSize of 0 (shows unchecked)', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 0 }
      })
      expect(getByRole('checkbox')).not.toBeChecked()
    })

    it('handles selectedSize greater than itemsSize (shows indeterminate)', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 10, itemsSize: 5 }
      })
      const checkbox = getByRole('checkbox') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })
  })

  describe('attribute passthrough', () => {
    it('passes through hide-label attribute', () => {
      const { container } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5, label: 'Select All' },
        attrs: { 'hide-label': true }
      })
      const labelSpan = container.querySelector('.sr-only')
      expect(labelSpan).toBeInTheDocument()
    })

    it('passes through disabled attribute', () => {
      const { getByRole } = render(CheckboxSelectAll, {
        props: { selectedSize: 0, itemsSize: 5 },
        attrs: { disabled: true }
      })
      expect(getByRole('checkbox')).toBeDisabled()
    })
  })
})
