import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { Combobox } from '@headlessui/vue'
import { ref } from 'vue'

import SelectableOptionGroup from '../SelectableOptionGroup.vue'

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' }
]

function renderWithCombobox(props: {
  title: string
  options: { value: string; label: string; disabled?: boolean }[]
  modelValue?: string[]
}) {
  const comboboxValue = ref(props.modelValue ?? [])

  return render({
    components: { Combobox, SelectableOptionGroup },
    setup() {
      return { comboboxValue, props }
    },
    template: `
      <Combobox v-model="comboboxValue" multiple>
        <SelectableOptionGroup
          :title="props.title"
          :options="props.options"
          :model-value="props.modelValue"
        />
      </Combobox>
    `
  })
}

function getHeaderCheckbox(container: HTMLElement): HTMLInputElement {
  const header = container.querySelector('.a-selectable-option-group__header')
  if (!header) throw new Error('Header not found')
  const checkbox = header.querySelector('input[type="checkbox"]') as HTMLInputElement
  if (!checkbox) throw new Error('Header checkbox not found')
  return checkbox
}

describe('SelectableOptionGroup.vue', () => {
  describe('checkbox state', () => {
    it('shows unchecked when no options selected', () => {
      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: defaultOptions,
        modelValue: []
      })

      const checkbox = getHeaderCheckbox(container)
      expect(checkbox).not.toBeChecked()
      expect(checkbox.indeterminate).toBe(false)
    })

    it('shows checked when all options selected', () => {
      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: defaultOptions,
        modelValue: ['a', 'b', 'c']
      })

      const checkbox = getHeaderCheckbox(container)
      expect(checkbox).toBeChecked()
    })

    it('shows indeterminate when some options selected', () => {
      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: defaultOptions,
        modelValue: ['a']
      })

      const checkbox = getHeaderCheckbox(container)
      expect(checkbox).not.toBeChecked()
      expect(checkbox.indeterminate).toBe(true)
    })

    it('excludes disabled options from "all selected" calculation', () => {
      const optionsWithDisabled = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C', disabled: true }
      ]

      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: optionsWithDisabled,
        modelValue: ['a', 'b'] // All enabled options selected
      })

      // Should show as fully checked since all enabled options are selected
      const checkbox = getHeaderCheckbox(container as HTMLElement)
      expect(checkbox).toBeChecked()
    })

    it('shows indeterminate when only disabled option is unselected', () => {
      const optionsWithDisabled = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' }
      ]

      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: optionsWithDisabled,
        modelValue: ['a'] // Only one of two enabled options
      })

      const checkbox = getHeaderCheckbox(container as HTMLElement)
      expect(checkbox.indeterminate).toBe(true)
    })
  })

  describe('click behavior', () => {
    it('triggers ComboboxOption selection when header clicked', async () => {
      const comboboxValue = ref<string[]>([])

      const { container } = render({
        components: { Combobox, SelectableOptionGroup },
        setup() {
          return { comboboxValue, options: defaultOptions }
        },
        template: `
          <Combobox v-model="comboboxValue" multiple>
            <SelectableOptionGroup
              title="Test Group"
              :options="options"
              :model-value="[]"
            />
          </Combobox>
        `
      })

      const checkbox = getHeaderCheckbox(container as HTMLElement)
      await userEvent.click(checkbox)

      // Clicking header triggers ComboboxOption with __group__ prefixed value
      // In real usage, Combobox.vue intercepts this in model setter and calls handleGroupToggle
      expect(comboboxValue.value).toContain('__group__Test Group')
    })
  })

  describe('rendering', () => {
    it('displays group title', () => {
      const { getByText } = renderWithCombobox({
        title: 'My Group',
        options: defaultOptions,
        modelValue: []
      })

      expect(getByText('My Group')).toBeInTheDocument()
    })

    it('renders child options', () => {
      const { getByText } = renderWithCombobox({
        title: 'Test Group',
        options: defaultOptions,
        modelValue: []
      })

      expect(getByText('Option A')).toBeInTheDocument()
      expect(getByText('Option B')).toBeInTheDocument()
      expect(getByText('Option C')).toBeInTheDocument()
    })

    it('has correct accessibility attributes', () => {
      const { container } = renderWithCombobox({
        title: 'Test Group',
        options: defaultOptions,
        modelValue: []
      })

      const group = container.querySelector('[role="group"]')
      expect(group).toBeInTheDocument()
      expect(group).toHaveAttribute('aria-labelledby')
    })
  })

  describe('edge cases', () => {
    it('handles empty options array', () => {
      const { container } = renderWithCombobox({
        title: 'Empty Group',
        options: [],
        modelValue: []
      })

      const checkbox = getHeaderCheckbox(container as HTMLElement)
      expect(checkbox).not.toBeChecked()
      expect(checkbox.indeterminate).toBe(false)
    })

    it('handles all disabled options', () => {
      const allDisabled = [
        { value: 'a', label: 'Option A', disabled: true },
        { value: 'b', label: 'Option B', disabled: true }
      ]

      const { container } = renderWithCombobox({
        title: 'All Disabled',
        options: allDisabled,
        modelValue: []
      })

      const checkbox = getHeaderCheckbox(container as HTMLElement)
      // No enabled options, so cannot be "all selected"
      expect(checkbox).not.toBeChecked()
      expect(checkbox.indeterminate).toBe(false)
    })
  })
})
