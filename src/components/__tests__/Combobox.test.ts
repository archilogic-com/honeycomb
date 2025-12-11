import { render, screen } from '@testing-library/vue'

import Combobox from '../Combobox.vue'

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
  { value: 'd', label: 'Option D' },
  { value: 'e', label: 'Option E' }
]

// Helper to count visible tags in the combobox trigger
// Tags have removable buttons with aria-label="Remove"
const getVisibleTagCount = () => {
  return screen.queryAllByLabelText('Remove').length
}

// Helper to check if a tag with specific text is visible
const hasVisibleTag = (label: string) => {
  // Tags are rendered as ATag components with removable buttons
  // The tag text appears alongside the Remove button
  const removeButtons = screen.queryAllByLabelText('Remove')
  return removeButtons.some(button => {
    const tag = button.closest('[class*="a-tag"]') || button.parentElement
    return tag?.textContent?.includes(label)
  })
}

describe('Combobox.vue - Multi-select tag display', () => {
  describe('maxTags prop', () => {
    it('displays all tags when maxTags is undefined', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e']
        }
      })

      // All 5 tags should be visible (each has a Remove button)
      expect(getVisibleTagCount()).toBe(5)
      expect(hasVisibleTag('Option A')).toBe(true)
      expect(hasVisibleTag('Option B')).toBe(true)
      expect(hasVisibleTag('Option C')).toBe(true)
      expect(hasVisibleTag('Option D')).toBe(true)
      expect(hasVisibleTag('Option E')).toBe(true)
    })

    it('limits visible tags to maxTags count', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e'],
          maxTags: 2
        }
      })

      // Only 2 tags should be visible
      expect(getVisibleTagCount()).toBe(2)
      expect(hasVisibleTag('Option A')).toBe(true)
      expect(hasVisibleTag('Option B')).toBe(true)
      expect(hasVisibleTag('Option C')).toBe(false)
      expect(hasVisibleTag('Option D')).toBe(false)
      expect(hasVisibleTag('Option E')).toBe(false)
    })

    it('shows collapsed indicator when tags exceed maxTags', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e'],
          maxTags: 2
        }
      })

      expect(screen.getByText('+3 more')).toBeInTheDocument()
    })

    it('does not show indicator when maxTags >= selected count', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b'],
          maxTags: 3
        }
      })

      expect(screen.queryByText(/more/)).not.toBeInTheDocument()
    })

    it('handles maxTags: 0 showing only indicator', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c'],
          maxTags: 0
        }
      })

      // With maxTags: 0, no tags should be visible (no Remove buttons)
      expect(getVisibleTagCount()).toBe(0)
      expect(hasVisibleTag('Option A')).toBe(false)
      expect(hasVisibleTag('Option B')).toBe(false)
      expect(hasVisibleTag('Option C')).toBe(false)
      // The collapsed indicator should be shown
      expect(screen.getByText('+3 more')).toBeInTheDocument()
    })
  })

  describe('collapsedTagsLabel prop', () => {
    it('uses default label format "+N more"', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd'],
          maxTags: 1
        }
      })

      expect(screen.getByText('+3 more')).toBeInTheDocument()
    })

    it('uses custom label function when provided', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd'],
          maxTags: 1,
          collapsedTagsLabel: (count: number) => `and ${count} others`
        }
      })

      expect(screen.getByText('and 3 others')).toBeInTheDocument()
    })

    it('passes correct hidden count to label function', () => {
      const labelFn = vi.fn((count: number) => `(${count} hidden)`)

      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e'],
          maxTags: 2,
          collapsedTagsLabel: labelFn
        }
      })

      expect(labelFn).toHaveBeenCalledWith(3)
      expect(screen.getByText('(3 hidden)')).toBeInTheDocument()
    })
  })

  describe('#selected-tags slot', () => {
    it('renders custom content when slot is used', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c']
        },
        slots: {
          'selected-tags': '<span data-testid="custom-tags">Custom tags content</span>'
        }
      })

      expect(screen.getByTestId('custom-tags')).toBeInTheDocument()
      expect(screen.getByText('Custom tags content')).toBeInTheDocument()
    })

    it('provides selectedValues slot prop', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c']
        },
        slots: {
          'selected-tags': `
            <template #selected-tags="{ selectedValues }">
              <span data-testid="count">{{ selectedValues.length }} selected</span>
            </template>
          `
        }
      })

      expect(screen.getByTestId('count')).toHaveTextContent('3 selected')
    })

    it('provides visibleValues slot prop respecting maxTags', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e'],
          maxTags: 2
        },
        slots: {
          'selected-tags': `
            <template #selected-tags="{ visibleValues }">
              <span data-testid="visible">{{ visibleValues.length }} visible</span>
            </template>
          `
        }
      })

      expect(screen.getByTestId('visible')).toHaveTextContent('2 visible')
    })

    it('provides hiddenCount slot prop', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c', 'd', 'e'],
          maxTags: 2
        },
        slots: {
          'selected-tags': `
            <template #selected-tags="{ hiddenCount }">
              <span data-testid="hidden">{{ hiddenCount }} hidden</span>
            </template>
          `
        }
      })

      expect(screen.getByTestId('hidden')).toHaveTextContent('3 hidden')
    })
  })

  describe('edge cases', () => {
    it('ignores maxTags in single-select mode', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: 'a',
          maxTags: 0
        }
      })

      // In single-select mode, the selected value is displayed as text, not tags
      // The maxTags prop should have no effect
      expect(screen.queryByText('+1 more')).not.toBeInTheDocument()
    })

    it('does not render tags in inline mode', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['a', 'b', 'c'],
          inline: true
        }
      })

      // In inline mode, tags are not rendered (existing behavior)
      // Just verify no tags are shown
      expect(screen.queryByRole('button', { name: /Option A/i })).not.toBeInTheDocument()
    })

    it('handles empty selection', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: [],
          maxTags: 2
        }
      })

      expect(screen.queryByText(/more/)).not.toBeInTheDocument()
    })

    it('handles selection with values not in options', () => {
      render(Combobox, {
        props: {
          options: defaultOptions,
          modelValue: ['unknown1', 'unknown2', 'unknown3'],
          maxTags: 1
        }
      })

      // Should show the raw value when option not found
      expect(screen.getByText('unknown1')).toBeInTheDocument()
      expect(screen.getByText('+2 more')).toBeInTheDocument()
    })
  })
})
