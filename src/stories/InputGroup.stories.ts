import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { within } from 'storybook/test'
import { ref } from 'vue'
import { AInputGroup, ATextInput, ALabelContainer, AToggle, ACombobox, AIcon } from '../components'

type InputGroupArgs = ComponentProps<typeof AInputGroup> & {
  size?: string
  align?: string
  labelClasses?: string
  maxlength?: string | number
  class?: string
}

const meta: Meta<InputGroupArgs> = {
  title: 'Components/InputGroup',
  component: AInputGroup,
  subcomponents: { ALabelContainer }
}

export default meta

type Story = StoryObj<InputGroupArgs>

const render = (args: InputGroupArgs) => ({
  components: { AInputGroup, ATextInput },
  setup() {
    const myValue = ref('')
    return { args, myValue }
  },
  template: `
  <AInputGroup v-bind="args" class="w-[300px]">
    <template #input="{labelledby, describedby}">
      <a-text-input :size="args.size" v-model="myValue" :aria-invalid="args.invalid" :aria-labelledby="labelledby" :aria-describedby="describedby" :maxlength="args.maxlength"/>
    </template>
  </AInputGroup>`
})

const focusInput = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('textbox').focus()
}

export const LabelXsCol: Story = {
  name: 'label xs col',
  render,
  args: { label: 'Username' }
}

export const MaxlengthXsCol: Story = {
  name: 'maxlength xs col',
  render,
  play: focusInput,
  args: { label: 'Username', maxlength: '30' }
}

export const HintXsCol: Story = {
  name: 'hint xs col',
  render,
  args: {
    label: 'Username',
    helper: 'Only letters and numbers allowed'
  }
}

export const ErrorXsCol: Story = {
  name: 'error xs col',
  render,
  args: {
    label: 'Username',
    invalid: true,
    helper: 'Only letters and numbers allowed'
  }
}

export const LabelSmRow: Story = {
  name: 'label sm row',
  render,
  args: { label: 'Username', size: 'sm', align: 'row', labelClasses: 'w-1/3' }
}

export const HintSmRow: Story = {
  name: 'hint sm row',
  render,
  args: {
    label: 'Username',
    helper: 'Only letters and numbers allowed',
    size: 'sm',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const ErrorSmRow: Story = {
  name: 'error sm row',
  render,
  args: {
    label: 'Username',
    invalid: true,
    helper: 'Only letters and numbers allowed',
    size: 'sm',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const LabelMdCol: Story = {
  name: 'label md col',
  render,
  args: { label: 'Username', size: 'md', align: 'col' }
}

export const MaxlengthMdCol: Story = {
  name: 'maxlength md col',
  render,
  play: focusInput,
  args: { label: 'Username', size: 'md', align: 'col', maxlength: 30 }
}

export const HintMdCol: Story = {
  name: 'hint md col',
  render,
  args: {
    label: 'Username',
    helper: 'Only letters and numbers allowed',
    size: 'md',
    align: 'col'
  }
}

export const ErrorMdCol: Story = {
  name: 'error md col',
  render,
  args: {
    label: 'Username',
    invalid: true,
    helper: 'Only letters and numbers allowed',
    size: 'md',
    align: 'col'
  }
}

export const Combobox: Story = {
  name: 'combobox',
  render: () => ({
    components: { AInputGroup, ACombobox },
    setup() {
      const myValue = ref('')
      const options = [
        { label: 'one', value: '1' },
        { label: 'two', value: '2' },
        { label: 'forty two', value: '42' }
      ]
      return { myValue, options }
    },
    template: `
      <div class="min-h-[160px]">
        <AInputGroup class="w-[300px]" label="Magic number">
          <template #input="{labelledby}">
            <a-combobox v-model="myValue" :aria-labelledby="labelledby" :options="options" />
          </template>
        </AInputGroup>
      </div>`
  })
}

export const Toggle: Story = {
  name: 'toggle',
  render: () => ({
    components: { AInputGroup, AToggle },
    setup() {
      const myValue = ref(true)
      return { myValue }
    },
    template: `
        <AInputGroup class="w-[300px]" label="Allow magic" labelClasses="w-1/3" align="row">
          <template #input="{labelledby}">
            <a-toggle v-model="myValue" :aria-labelledby="labelledby" />
          </template>
        </AInputGroup>`
  })
}

export const LabelAndHelperSlots: Story = {
  name: 'label and helper slots',
  render: () => ({
    components: { AInputGroup, ATextInput, AIcon },
    setup() {
      const myValue = ref('')
      return { myValue }
    },
    template: `
        <AInputGroup v-bind="args" class="w-[300px]">
          <template #label> <a-icon class="mr-1" name="user" size="sm"/> Label with an icon </template>
          <template #input="{labelledby, describedby}">
            <a-text-input  v-model="myValue" :aria-labelledby="labelledby" :aria-describedby="describedby" />
          </template>
          <template #helper> Helper needs an icon <a-icon class="ml-1" name="flag" size="sm"/></template>
        </AInputGroup>`
  })
}
