import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import TextInput from '../TextInput.vue'

describe('TextInput.vue', () => {
  describe('when an input is focused', () => {
    it('the value is selected for size sm', async () => {
      const value = 'test value'
      const { getByRole } = render(TextInput, {
        props: { modelValue: value, size: 'sm' }
      })
      const input = getByRole('textbox') as HTMLInputElement
      await userEvent.click(input)
      expect(Number(input.selectionEnd) - Number(input.selectionStart)).toBe(value.length)
    })
    it('the value is not selected for size md', async () => {
      const value = 'test value'
      const { getByRole } = render(TextInput, {
        props: { modelValue: value, size: 'md' }
      })
      const input = getByRole('textbox') as HTMLInputElement
      await userEvent.click(input)
      expect(Number(input.selectionEnd) - Number(input.selectionStart)).toBe(0)
    })
  })
  describe('when the input value is changed by the user', () => {
    it('emits the "update" event with new model value', async () => {
      const { getByRole, emitted } = render(TextInput, {
        props: { modelValue: '' }
      })
      await userEvent.type(getByRole('textbox'), '!')
      expect(emitted()['update:modelValue'][0]).toEqual(['!'])
    })
  })
  it('renders an "input" element', () => {
    const { getByRole } = render(TextInput, {
      props: { modelValue: '' }
    })
    expect(getByRole('textbox').nodeName).toBe('INPUT')
  })
  describe("when type is 'multiline'", () => {
    it('renders a "textarea" element', () => {
      const { getByRole } = render(TextInput, {
        props: { modelValue: '', type: 'multiline' }
      })
      expect(getByRole('textbox').nodeName).toBe('TEXTAREA')
    })
  })
})
