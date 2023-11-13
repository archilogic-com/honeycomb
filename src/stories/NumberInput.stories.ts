import { ref } from 'vue'
import { Meta, StoryFn } from '@storybook/vue3'
import { within, userEvent } from '@storybook/testing-library'
import { ANumberInput, AInputGroup } from '../components'

export default {
  title: 'Components/NumberInput',
  component: ANumberInput
} as Meta

const Template: StoryFn = (args, meta) => ({
  components: { ANumberInput, AInputGroup },
  setup() {
    const inputValue = ref(args.initValue)
    return { story: meta.name, args, inputValue }
  },

  template: `
  <div  class="w-[300px]">
    <a-input-group :label="story" size="sm" :helper="args.helper" :invalid="args.invalid">
      <template #input="{labelledby, describedby}">
        <ANumberInput v-bind="args" v-model="inputValue" :aria-labelledby="labelledby" :aria-describedby="describedby"/>
      </template>
    </a-input-group>
    <div class="p-1 mt-3 body-xs-600 bg-palegreen text-navy"> v-model value: {{inputValue}}</div>
  </div>
  `
})

const focusInput: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('spinbutton').focus()
}

const stepUp: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('spinbutton').focus()
  await userEvent.click(canvas.getByRole('button', { name: 'Step Up' }))
}

const stepDown: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('spinbutton').focus()
  await userEvent.click(canvas.getByRole('button', { name: 'Step Down' }))
}

export const SizeSm = Template.bind({})

export const SizeSmValue = Template.bind({})
SizeSmValue.args = {
  initValue: 10
}

export const SizeMd = Template.bind({})
SizeMd.args = {
  size: 'md'
}

export const SizeMdValue = Template.bind({})
SizeMdValue.args = {
  initValue: 10,
  size: 'md'
}

export const Subtle = Template.bind({})
Subtle.args = {
  variant: 'subtle'
}

export const SubtleValue = Template.bind({})
SubtleValue.args = {
  initValue: 10,
  variant: 'subtle'
}

export const CustomPlaceholder = Template.bind({})
CustomPlaceholder.args = {
  placeholder: 'My custom placeholder'
}
export const SubtleCustomPlaceholder = Template.bind({})
SubtleCustomPlaceholder.args = {
  variant: 'subtle',
  placeholder: 'My custom placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
export const DisabledValue = Template.bind({})
DisabledValue.args = {
  initValue: 10,
  disabled: true
}

export const SizeSmFocused = Template.bind({})
SizeSmFocused.play = focusInput

export const SizeSmFocusedValue = Template.bind({})
SizeSmFocusedValue.args = {
  initValue: 10
}
SizeSmFocusedValue.play = focusInput

export const SizeMdFocused = Template.bind({})
SizeMdFocused.args = {
  size: 'md'
}
SizeMdFocused.play = focusInput

export const SizeMdFocusedValue = Template.bind({})
SizeMdFocusedValue.args = {
  initValue: 10,
  size: 'md'
}
SizeMdFocusedValue.play = focusInput

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  helper: 'This is wrong'
}

export const InvalidValue = Template.bind({})
InvalidValue.args = {
  initValue: 10,
  invalid: true,
  helper: 'This is wrong'
}

export const InvalidValueFocused = Template.bind({})
InvalidValueFocused.args = {
  initValue: 10,
  invalid: true
}
InvalidValueFocused.play = focusInput

export const StepUp = Template.bind({})
StepUp.args = {
  initValue: 10,
  step: 0.5
}
StepUp.play = stepUp

export const StepDown = Template.bind({})
StepDown.args = {
  initValue: 10,
  step: 0.5
}
StepDown.play = stepDown
