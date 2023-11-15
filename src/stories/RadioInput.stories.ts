import { ref } from 'vue'
import { Meta, StoryFn } from '@storybook/vue3'
import { within, userEvent } from '@storybook/testing-library'
import { ARadioInput } from '../components'

export default {
  title: 'Components/RadioInput',
  component: ARadioInput
} as Meta

const Template: StoryFn = args => ({
  components: { ARadioInput },
  setup() {
    const value = ref('one')
    return { args, value }
  },
  template: `
<div class="w-[300px]">
  <ARadioInput v-model="value" value="one" :label="args.label || 'Option 1'" :disabled="args.disabled">
  </ARadioInput>
  <ARadioInput v-model="value" value="two" :disabled="args.disabled">
   ${args.default || 'Option 2'}
  </ARadioInput>
  <div class="p-1 mt-3 body-xs-600 bg-palegreen text-navy"> v-model value: {{ value }}</div>
</div>
`
})

const focusRadio: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('radio', { checked: false }).focus()
}

const selectRadio: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('radio', { checked: false }).focus()
  await userEvent.keyboard('[Space]')
}

export const Default = Template.bind({})

export const DefaultFocused = Template.bind({})
DefaultFocused.play = focusRadio

export const DefaultSelectedFocused = Template.bind({})
DefaultSelectedFocused.play = selectRadio

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}

export const LongLabel = Template.bind({})
LongLabel.args = {
  label:
    'Yes, Archilogic can contact me on a one-to-one basis and send me quarter product updates and relevant notifications.'
}

export const LabelSlot = Template.bind({})
LabelSlot.args = {
  default: '<p class="body-sm-600">Bold Label in Slot</p>'
}

const TemplateHidden: StoryFn = args => ({
  components: { ARadioInput },
  setup() {
    const value = ref('two')
    return { args, value }
  },
  template: `
<div class="w-[300px]">
  <ARadioInput v-model="value" value="one" aria-label="Hidden Label">
  </ARadioInput>
  <ARadioInput v-model="value" value="two" aria-labelledby="xyz">
  </ARadioInput>
  <p id="xyz" class="mt-4">I'm a special radio label</p>
  <div class="p-1 mt-3 body-xs-600 bg-palegreen text-navy"> v-model value: {{ value }}</div>
</div>
`
})

export const HiddenLabel = TemplateHidden.bind({})
