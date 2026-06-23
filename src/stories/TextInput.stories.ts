import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { within } from 'storybook/test'
import { ref } from 'vue'
import { ATextInput, AHelperText } from '../components'

type TextInputArgs = Omit<ComponentProps<typeof ATextInput>, 'type'> & {
  // widened to string: a story intentionally demos type="number" (not in the component union)
  type?: string
  initValue?: string
  messageType?: 'hint' | 'error'
  disabled?: boolean
  maxlength?: number
  class?: string
}

const meta: Meta<TextInputArgs> = {
  title: 'Components/TextInput',
  component: ATextInput
}

export default meta

type Story = StoryObj<TextInputArgs>

const render = (args: TextInputArgs) => ({
  components: { ATextInput },
  setup() {
    const inputValue = ref(args.initValue)
    return { args, inputValue }
  },
  template: `
    <div class="p-2">
      <ATextInput v-bind="args" v-model="inputValue"/>
    </div>`
})

const TemplateWithMessage = (args: TextInputArgs) => ({
  components: { ATextInput, AHelperText },
  setup() {
    const inputValue = ref(args.initValue)
    return { args, inputValue }
  },
  template: `
  <div>
    <ATextInput v-bind="args" v-model="inputValue" />
    <AHelperText :variant="args.messageType">
      Please use only letters and numbers.
    </AHelperText>
  </div>`
})

const focusInput = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('textbox').focus()
}

export const InputTypeText: Story = {
  name: 'input type text',
  render,
  args: { size: 'md', placeholder: 'type anything', type: 'text' }
}

export const InputTypeEmail: Story = {
  name: 'input type email',
  render,
  args: { size: 'md', placeholder: 'example@example.com', type: 'email' }
}

export const InputTypeUrl: Story = {
  name: 'input type url',
  render,
  args: { size: 'md', placeholder: 'archilogic.com', type: 'url' }
}

export const InputTypePassword: Story = {
  name: 'input type password',
  render,
  args: { size: 'md', placeholder: 'password123', type: 'password' }
}

export const InputTypeNumber: Story = {
  name: 'input type number',
  render,
  args: { size: 'md', placeholder: '12345', type: 'number' }
}

export const InputTypeSearch: Story = {
  name: 'input type search',
  render,
  args: { size: 'md', placeholder: 'Floor 123', type: 'search' }
}

export const InputVModel: Story = {
  name: 'input v-model',
  render,
  args: { size: 'md' }
}

export const InputEventListener: Story = {
  name: 'input event listener',
  render: () => ({
    components: { ATextInput },
    setup() {
      const inputValue = ref('')
      const handleChange = (value: string) => {
        inputValue.value = value
      }
      return { handleChange, inputValue }
    },
    template: `<ATextInput size="md" :model-value="inputValue" @update:model-value="handleChange" />`
  })
}

export const InputMdWithValue: Story = {
  name: 'input md with value',
  render,
  args: { size: 'md', initValue: 'hello@gmail.com', placeholder: 'example@example.com' }
}

export const InputMdEmpty: Story = {
  name: 'input md empty',
  render,
  args: { size: 'md', initValue: '', placeholder: 'example@example.com' }
}

export const InputMdInvalid: Story = {
  name: 'input md invalid',
  render,
  args: { size: 'md', initValue: 'hello', valid: false, placeholder: 'example@example.com' }
}

export const InputMdWithValueDisabled: Story = {
  name: 'input md with value disabled',
  render,
  args: {
    size: 'md',
    initValue: 'hello@gmail.com',
    placeholder: 'example@example.com',
    disabled: true
  }
}

export const InputMdEmptyDisabled: Story = {
  name: 'input md empty disabled',
  render,
  args: { size: 'md', initValue: '', placeholder: 'example@example.com', disabled: true }
}

export const InputMdInvalidDisabled: Story = {
  name: 'input md invalid disabled',
  render,
  args: {
    size: 'md',
    initValue: 'hello',
    valid: false,
    placeholder: 'example@example.com',
    disabled: true
  }
}

export const InputSmWithValue: Story = {
  name: 'input sm with value',
  render,
  args: { size: 'sm', initValue: 'hello@gmail.com', placeholder: 'example@example.com' }
}

export const InputSmEmpty: Story = {
  name: 'input sm empty',
  render,
  args: { size: 'sm', initValue: '', placeholder: 'example@example.com' }
}

export const InputSmInvalid: Story = {
  name: 'input sm invalid',
  render,
  args: { size: 'sm', initValue: 'hello', valid: false, placeholder: 'example@example.com' }
}

export const InputSmWithValueDisabled: Story = {
  name: 'input sm with value disabled',
  render,
  args: {
    size: 'sm',
    initValue: 'hello@gmail.com',
    placeholder: 'example@example.com',
    disabled: true
  }
}

export const InputSmEmptyDisabled: Story = {
  name: 'input sm empty disabled',
  render,
  args: { size: 'sm', initValue: '', placeholder: 'example@example.com', disabled: true }
}

export const InputSmInvalidDisabled: Story = {
  name: 'input sm invalid disabled',
  render,
  args: {
    size: 'sm',
    initValue: 'hello',
    valid: false,
    placeholder: 'example@example.com',
    disabled: true
  }
}

export const InputSubtleSmWithValue: Story = {
  name: 'input subtle sm with value',
  render,
  args: {
    variant: 'subtle',
    size: 'sm',
    initValue: 'hello@gmail.com'
  }
}

export const InputSubtleSmEmpty: Story = {
  name: 'input subtle sm empty',
  render,
  args: { variant: 'subtle', size: 'sm', initValue: '' }
}

export const InputSubtleSmInvalid: Story = {
  name: 'input subtle sm invalid',
  render,
  args: {
    variant: 'subtle',
    size: 'sm',
    initValue: 'hello',
    valid: false
  }
}

export const InputSubtleSmWithValueDisabled: Story = {
  name: 'input subtle sm with value disabled',
  render,
  args: {
    variant: 'subtle',
    size: 'sm',
    initValue: 'hello@gmail.com',
    disabled: true
  }
}

export const InputSubtleSmEmptyDisabled: Story = {
  name: 'input subtle sm empty disabled',
  render,
  args: {
    variant: 'subtle',
    size: 'sm',
    initValue: '',
    disabled: true
  }
}

export const InputSubtleSmInvalidDisabled: Story = {
  name: 'input subtle sm invalid disabled',
  render,
  args: {
    size: 'sm',
    initValue: 'hello',
    variant: 'subtle',
    valid: false,
    disabled: true
  }
}

export const MultilineMd: Story = {
  name: 'multiline md',
  render,
  args: {
    size: 'md',
    type: 'multiline'
  }
}

export const MultilineSm: Story = {
  name: 'multiline sm',
  render,
  args: {
    type: 'multiline',
    size: 'sm'
  }
}

export const MultilineMdSubtle: Story = {
  name: 'multiline md subtle',
  render,
  args: {
    size: 'md',
    type: 'multiline',
    variant: 'subtle'
  }
}

export const MultilineSmSubtle: Story = {
  name: 'multiline sm subtle',
  render,
  args: {
    type: 'multiline',
    size: 'sm',
    variant: 'subtle'
  }
}

export const MultilineWrapping: Story = {
  name: 'multiline wrapping',
  render,
  args: {
    size: 'md',
    type: 'multiline',
    class: 'w-[300px]',
    initValue:
      'averyveryverylongstringwithoutanyspaceswatsoevertheremightbesomecommasthough,butitdoesnotmatterreally'
  }
}

export const HintMessageSm: Story = {
  name: 'hint message sm',
  render: TemplateWithMessage,
  args: {
    size: 'sm',
    initValue: 'hint sm',
    messageType: 'hint'
  }
}

export const HintMessageMd: Story = {
  name: 'hint message md',
  render: TemplateWithMessage,
  args: {
    size: 'md',
    initValue: 'hint default',
    messageType: 'hint'
  }
}

export const HintMessageSmMultiline: Story = {
  name: 'hint message sm multiline',
  render: TemplateWithMessage,
  args: {
    type: 'multiline',
    size: 'sm',
    initValue: 'hint sm multiline',
    messageType: 'hint'
  }
}

export const HintMessageMdMultiline: Story = {
  name: 'hint message md multiline',
  render: TemplateWithMessage,
  args: {
    type: 'multiline',
    size: 'md',
    initValue: 'hint default multiline',
    messageType: 'hint'
  }
}

export const ErrorMessageSm: Story = {
  name: 'error message sm',
  render: TemplateWithMessage,
  args: {
    size: 'sm',
    initValue: 'error sm',
    valid: false,
    messageType: 'error'
  }
}

export const ErrorMessageMd: Story = {
  name: 'error message md',
  render: TemplateWithMessage,
  args: {
    size: 'md',
    initValue: 'error default',
    messageType: 'error',
    valid: false
  }
}

export const ErrorMessageSmMultiline: Story = {
  name: 'error message sm multiline',
  render: TemplateWithMessage,
  args: {
    type: 'multiline',
    size: 'sm',
    initValue: 'error sm multiline',
    valid: false,
    messageType: 'error'
  }
}

export const ErrorMessageMdMultiline: Story = {
  name: 'error message md multiline',
  render: TemplateWithMessage,
  args: {
    size: 'md',
    type: 'multiline',
    initValue: 'error default multiline',
    messageType: 'error',
    valid: false
  }
}

export const MaxlengthSm: Story = {
  name: 'maxlength sm',
  play: focusInput,
  render,
  args: {
    size: 'sm',
    initValue: '',
    maxlength: 30
  }
}

export const MaxlengthSmMultiline: Story = {
  name: 'maxlength sm multiline',
  play: focusInput,
  render,
  args: {
    type: 'multiline',
    size: 'sm',
    initValue: '',
    maxlength: 300
  }
}

export const MaxlengthValueMd: Story = {
  name: 'maxlength value md',
  play: focusInput,
  render,
  args: {
    size: 'md',
    initValue: 'test',
    maxlength: 30
  }
}

export const MaxlengthMdValueMultiline: Story = {
  name: 'maxlength md value multiline',
  play: focusInput,
  render,
  args: {
    type: 'multiline',
    size: 'md',
    initValue: 'test',
    maxlength: 300
  }
}
