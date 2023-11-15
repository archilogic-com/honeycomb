import { ref, computed } from 'vue'
import { Meta, StoryFn } from '@storybook/vue3'
import { within, userEvent } from '@storybook/testing-library'
import { AListbox, AOption, AOptionGroup } from '../components'

export default {
  title: 'Components/Listbox',
  component: AListbox,
  subcomponents: { AOption, AOptionGroup }
} as Meta

const defaultOptions = [
  { value: 'center', label: 'Center' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
]

const Template: StoryFn = (args, meta) => ({
  components: { AListbox },
  setup() {
    const selected = ref(args.initValue || '')
    const { classes = 'w-[160px]', ...props } = args
    const options = args.options || defaultOptions
    return { story: meta.name, props, options, selected, classes }
  },
  template: `
  <div class="flex min-h-[200px] bg-white p-2 gap-2 ${
    args.direction === 'up' ? 'flex-col-reverse' : 'flex-col'
  }">
    <p class="body-xs">Selected value: {{JSON.stringify(selected)}}</p>
    <p class="body-lg">{{story}}</p>
    <AListbox v-bind="props" v-model="selected" :options="options" :class="[classes]" />
  </div>`
})

const focusListbox: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').focus()
}

const openListbox: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button'))
}

export const Basic = Template.bind({})
Basic.play = openListbox

export const CustomPlaceholder = Template.bind({})
CustomPlaceholder.args = { placeholder: 'Pick a position' }

export const SizeMdSelected = Template.bind({})
SizeMdSelected.args = {
  size: 'md',
  initValue: 'left',
  placeholder: ''
}

export const SizeMd = Template.bind({})
SizeMd.args = { size: 'md' }

export const SizeMdSelectedFocused = Template.bind({})
SizeMdSelectedFocused.args = {
  size: 'md',
  initValue: 'left',
  placeholder: ''
}
SizeMdSelectedFocused.play = focusListbox

export const SizeMdFocused = Template.bind({})
SizeMdFocused.args = { size: 'md' }
SizeMdFocused.play = focusListbox

export const SizeMdSelectedOpen = Template.bind({})
SizeMdSelectedOpen.args = {
  size: 'md',
  initValue: 'left',
  placeholder: ''
}
SizeMdSelectedOpen.play = openListbox

export const SizeMdOpen = Template.bind({})
SizeMdOpen.args = { size: 'md' }
SizeMdOpen.play = openListbox

export const SizeMdSelectedDisabled = Template.bind({})
SizeMdSelectedDisabled.args = {
  size: 'md',
  initValue: 'left',
  disabled: true
}

export const SizeMdDisabled = Template.bind({})
SizeMdDisabled.args = { size: 'md', disabled: true }

export const SizeSmSelected = Template.bind({})
SizeSmSelected.args = {
  initValue: 'left',
  placeholder: ''
}

export const SizeSm = Template.bind({})

export const SizeSmSelectedFocused = Template.bind({})
SizeSmSelectedFocused.args = {
  initValue: 'left',
  placeholder: ''
}
SizeSmSelectedFocused.play = focusListbox

export const SizeSmFocused = Template.bind({})
SizeSmFocused.play = focusListbox

export const SizeSmSelectedOpen = Template.bind({})
SizeSmSelectedOpen.args = {
  initValue: 'left',
  placeholder: ''
}
SizeSmSelectedOpen.play = openListbox

export const SizeSmOpen = Template.bind({})
SizeSmOpen.play = openListbox

export const SizeSmSelectedDisabled = Template.bind({})
SizeSmSelectedDisabled.args = {
  initValue: 'left',
  disabled: true
}

export const SizeSmDisabled = Template.bind({})
SizeSmDisabled.args = { disabled: true }

export const SubtleSelected = Template.bind({})
SubtleSelected.args = {
  variant: 'subtle',
  initValue: 'left',
  placeholder: ''
}

export const Subtle = Template.bind({})
Subtle.args = {
  variant: 'subtle'
}

export const SubtleSelectedFocused = Template.bind({})
SubtleSelectedFocused.args = {
  variant: 'subtle',
  initValue: 'left',
  placeholder: ''
}
SubtleSelectedFocused.play = focusListbox

export const SubtleFocused = Template.bind({})
SubtleFocused.args = {
  variant: 'subtle'
}
SubtleFocused.play = focusListbox

export const SubtleSelectedOpen = Template.bind({})
SubtleSelectedOpen.args = {
  variant: 'subtle',
  initValue: 'left',
  placeholder: ''
}
SubtleSelectedOpen.play = openListbox

export const SubtleOpen = Template.bind({})
SubtleOpen.args = {
  variant: 'subtle'
}
SubtleOpen.play = openListbox

export const SubtleSelectedDisabled = Template.bind({})
SubtleSelectedDisabled.args = {
  variant: 'subtle',
  initValue: 'left',
  disabled: true
}

export const SubtleDisabled = Template.bind({})
SubtleDisabled.args = {
  variant: 'subtle',
  disabled: true
}

export const DirectionUp = Template.bind({})
DirectionUp.args = {
  initValue: '',
  direction: 'up'
}
DirectionUp.play = openListbox

export const Inline = Template.bind({})
Inline.args = {
  inline: true
}

const longOptions = [
  { value: '#ff0000', label: 'The reddest red you have ever seen' },
  { value: '#00ff00', label: "A green greener than the neighbor's green grass" },
  { value: '#0000ff', label: "I'm blue Da ba dee da ba di" }
]
export const LongLabelOptionsSelected = Template.bind({})
LongLabelOptionsSelected.args = {
  initValue: '#00ff00',
  options: longOptions
}
LongLabelOptionsSelected.play = openListbox

export const LongLabelOptions = Template.bind({})
LongLabelOptions.args = {
  options: longOptions
}
LongLabelOptions.play = openListbox

export const FullWidth = Template.bind({})
FullWidth.args = {
  size: 'md',
  classes: 'w-full'
}
FullWidth.play = openListbox

export const HalfWidth = Template.bind({})
HalfWidth.args = {
  size: 'md',
  classes: 'w-1/2'
}
HalfWidth.play = openListbox

export const StaticWidth = Template.bind({})
StaticWidth.args = {
  size: 'md',
  classes: 'w-[10rem]'
}
StaticWidth.play = openListbox

const lotsOfOptions = [
  { value: '1', label: 'label 1' },
  { value: '2', label: 'label 2' },
  { value: '3', label: 'label 3' },
  { value: '4', label: 'label 4' },
  { value: '5', label: 'label 5' },
  { value: '6', label: 'label 6' },
  { value: '7', label: 'label 7' },
  { value: '8', label: 'label 8' },
  { value: '9', label: 'label 9' },
  { value: '10', label: 'label 10' },
  { value: '11', label: 'label 11' },
  { value: '12', label: 'label 12' }
]

export const PanelClasses = Template.bind({})
PanelClasses.args = {
  options: lotsOfOptions,
  panelClasses: 'max-h-[100px] overflow-auto'
}
PanelClasses.play = openListbox

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  options: [defaultOptions[0], { value: 'left', label: 'Left', disabled: true }, defaultOptions[2]]
}
DisabledOption.play = openListbox

const TemplateCustomOptions: StoryFn = (args, meta) => ({
  components: { AListbox, AOption },
  setup() {
    const inputValue = ref(args.initValue)
    const options = [
      { value: '#ff0000', label: 'Red' },
      { value: '#00ff00', label: 'Green' },
      { value: '#0000ff', label: 'Blue' }
    ]
    const selectedLabel = computed(() => options.find(x => inputValue.value === x.value)?.label)

    const getBgStyle = (color: string) => {
      return `background-color: ${color};`
    }
    return {
      args,
      story: meta.name,
      options,
      inputValue,
      getBgStyle,
      selectedLabel
    }
  },
  template: `
      <div class="bg-white h-[160px] p-4">
        <p class="mt-2 body-xs">Selected value: {{JSON.stringify(inputValue)}}</p>
        <p class="mb-2 body-lg">{{story}}</p>
        <AListbox v-bind="args" v-model="inputValue" :options="options" class="w-[10rem]">
          <template #listbox-value>
            <div class="flex items-center" v-if="inputValue">
              <div class="w-4 h-4 border rounded shrink-0 mr-2" :style="getBgStyle(inputValue)"></div>
              <div>{{ selectedLabel }}</div>
            </div>
          </template>
          <AOption v-for="option in options" :key="option.value" :option="option">
            <template #extra>            
              <div class="w-4 h-4 border rounded shrink-0 ml-2" :style="getBgStyle(option.value)"></div>
            </template>
            <span>{{ option.label }}</span>
            <span class="text-warsaw mx-2">({{option.value}})</span>
          </AOption>
        </AListbox>
      </div>
      `
})

export const CustomOptions = TemplateCustomOptions.bind({})
CustomOptions.args = {
  initValue: ''
}
CustomOptions.play = openListbox

export const CustomOptionsSelected = TemplateCustomOptions.bind({})
CustomOptionsSelected.args = {
  initValue: '#00ff00'
}
CustomOptionsSelected.play = openListbox

export const CustomModelValue = Template.bind({})
CustomModelValue.args = {
  initValue: 'Mixed'
}
CustomModelValue.play = openListbox

const groupedOptionsList = [
  {
    title: 'fruit',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'pear', label: 'Pear' }
    ]
  },
  {
    title: 'veggie',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'onion', label: 'Onion' }
    ]
  }
]

export const GroupedOptions = Template.bind({})
GroupedOptions.args = {
  initValue: '',
  options: groupedOptionsList,
  classes: 'w-[10rem] h-[20rem]'
}
GroupedOptions.play = openListbox

const optionsWithColors = [
  { value: 'demo', label: 'Demo', color: 'mediumblue' },
  { value: 'test', label: 'Test', color: 'aqua' },
  { value: 'my-project', label: 'My project', color: 'orange' },
  { value: 'new-client', label: 'New client', color: 'fandango' },
  { value: 'wip', label: 'WIP', color: 'sanfran' }
]

export const OptionsWithColor = Template.bind({})
OptionsWithColor.args = {
  options: optionsWithColors
}
OptionsWithColor.play = openListbox

export const OptionsWithColorSelected = Template.bind({})
OptionsWithColorSelected.args = {
  options: optionsWithColors,
  initValue: 'test'
}
OptionsWithColorSelected.play = openListbox

const TemplateOverflow: StoryFn = () => ({
  components: { AListbox },
  template: `
    <div class="relative h-[15rem]">
      <div class="border border-sanfran h-16 overflow-auto w-[20rem] flex flex-col px-2">
        <div class="text-sanfran">Overflow container</div>
        <AListbox escape-overflow class="flex-1" :options="[{ value: 0, label: 'Graphic' }, { value: 1, label: 'Rendered' }, { value: 2, label: 'Black and white' }]" />
      </div>
    </div>`
})

export const OverflowContainer = TemplateOverflow.bind({})
OverflowContainer.play = openListbox
