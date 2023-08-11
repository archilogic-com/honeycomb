import { ref, computed, Ref } from 'vue'
import { Meta, StoryFn } from '@storybook/vue3'
import { ACombobox, AOption, AOptionGroup, AColorCircle } from '../components'
import { within, userEvent } from '@storybook/testing-library'
import ComboboxDocs from './Combobox.mdx'
import type { Option } from '@/components/Option.vue'

export default {
  title: 'Components/Combobox',
  component: ACombobox,
  subcomponents: { AOption, AOptionGroup },
  parameters: {
    docs: {
      page: ComboboxDocs
    }
  }
} as Meta

const focusCombobox: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('combobox').focus()
}

const openCombobox: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('combobox').focus()
  await userEvent.keyboard('{ArrowDown}')
}

const selectOption: StoryFn['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('combobox').focus()
  await userEvent.keyboard('{ArrowDown}')
  await userEvent.keyboard('{Enter}')
}

const typeIntoCombobox = async (
  { canvasElement }: { canvasElement: HTMLElement },
  query = 'top'
) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByRole('combobox'), query)
}

const selectOptionAndTypeIntoCombobox = async (
  { canvasElement }: { canvasElement: HTMLElement },
  query = 'top'
) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('combobox').focus()
  await userEvent.keyboard('{ArrowDown}')
  await userEvent.keyboard('{Enter}')
  await userEvent.type(canvas.getByRole('combobox'), query)
}

const removeOption = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('combobox').focus()
  await userEvent.keyboard('{Delete}')
}

const defaultOptions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center-left', label: 'Center Left' },
  { value: 'center-right', label: 'Center Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
]

const Template: StoryFn = (args, meta) => ({
  components: { ACombobox },
  setup() {
    const selected = ref(args.initValue || '')
    const { classes = 'w-[160px]', ...props } = args
    const options = args.options || defaultOptions
    return { story: meta.name, props, options, selected, classes }
  },
  template: `
  <div class="flex min-h-[320px] bg-white p-2 ${
    args.direction === 'up' ? 'flex-col-reverse' : 'flex-col'
  }">
    <p class="mt-2 body-xs">Selected value: {{JSON.stringify(selected)}}</p>
    <p class="mb-2 body-lg">{{story}}</p>
    <ACombobox v-bind="props" v-model="selected" :options="options" :class="classes" />
  </div>`
})

export const Basic = Template.bind({})
Basic.play = openCombobox

export const CustomPlaceholder = Template.bind({})
CustomPlaceholder.args = { placeholder: 'Pick a position' }

export const WithQuery = Template.bind({})
WithQuery.args = { placeholder: 'Pick a position' }
WithQuery.play = typeIntoCombobox

export const NoResults = Template.bind({})
NoResults.args = { placeholder: 'Pick a position' }
NoResults.play = args => typeIntoCombobox(args, 'nope')

export const Multiselect = Template.bind({})
Multiselect.args = {
  classes: 'w-[200px]',
  initValue: []
}
Multiselect.play = openCombobox

export const MultiselectSelected = Template.bind({})
MultiselectSelected.args = {
  classes: 'w-[200px]',
  initValue: []
}
MultiselectSelected.play = selectOption

export const MultiselectWithQuery = Template.bind({})
MultiselectWithQuery.args = { initValue: [], classes: 'w-[200px]' }
MultiselectWithQuery.play = selectOptionAndTypeIntoCombobox

export const MultiselectSelectedRemove = Template.bind({})
MultiselectSelectedRemove.args = { initValue: ['center-left', 'top-right'], classes: 'w-[200px]' }
MultiselectSelectedRemove.play = removeOption

export const MultiselectNoResults = Template.bind({})
MultiselectNoResults.args = { initValue: [], classes: 'w-[200px]' }
MultiselectNoResults.play = args => selectOptionAndTypeIntoCombobox(args, 'nope')

export const SizeMdSelected = Template.bind({})
SizeMdSelected.args = {
  size: 'md',
  initValue: 'top-left'
}
export const SizeMd = Template.bind({})
SizeMd.args = { size: 'md' }

export const SizeMdSelectedFocused = Template.bind({})
SizeMdSelectedFocused.args = {
  size: 'md',
  initValue: 'top-left'
}
SizeMdSelectedFocused.play = focusCombobox

export const SizeMdFocused = Template.bind({})
SizeMdFocused.args = { size: 'md' }
SizeMdFocused.play = focusCombobox

export const SizeMdSelectedOpen = Template.bind({})
SizeMdSelectedOpen.args = {
  size: 'md',
  initValue: 'top-left'
}
SizeMdSelectedOpen.play = openCombobox

export const SizeMdOpen = Template.bind({})
SizeMdOpen.args = { size: 'md' }
SizeMdOpen.play = openCombobox

export const SizeMdSelectedDisabled = Template.bind({})
SizeMdSelectedDisabled.args = {
  size: 'md',
  initValue: 'top-left',
  disabled: true
}

export const SizeMdDisabled = Template.bind({})
SizeMdDisabled.args = { size: 'md', disabled: true }

export const MultiselectSizeMdSelected = Template.bind({})
MultiselectSizeMdSelected.args = {
  size: 'md',
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}

export const MultiselectSizeMdSelectedFocused = Template.bind({})
MultiselectSizeMdSelectedFocused.args = {
  size: 'md',
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}
MultiselectSizeMdSelectedFocused.play = focusCombobox

export const MultiselectSizeMdSelectedOpen = Template.bind({})
MultiselectSizeMdSelectedOpen.args = {
  size: 'md',
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}
MultiselectSizeMdSelectedOpen.play = openCombobox

export const MultiselectSizeMdSelectedDisabled = Template.bind({})
MultiselectSizeMdSelectedDisabled.args = {
  size: 'md',
  classes: 'w-[200px]',
  disabled: true,
  initValue: ['top-left', 'center-right']
}

export const MultiselectSizeMd = Template.bind({})
MultiselectSizeMd.args = {
  size: 'md',
  initValue: [],
  classes: 'w-[200px]'
}

export const MultiselectSizeMdFocused = Template.bind({})
MultiselectSizeMdFocused.args = {
  size: 'md',
  initValue: [],
  classes: 'w-[200px]'
}
MultiselectSizeMdFocused.play = focusCombobox

export const MultiselectSizeMdOpen = Template.bind({})
MultiselectSizeMdOpen.args = {
  size: 'md',
  initValue: [],
  classes: 'w-[200px]'
}
MultiselectSizeMdOpen.play = openCombobox

export const MultiselectSizeMdDisabled = Template.bind({})
MultiselectSizeMdDisabled.args = {
  size: 'md',
  initValue: [],
  classes: 'w-[200px]',
  disabled: true
}

export const SizeSmSelected = Template.bind({})
SizeSmSelected.args = {
  initValue: 'top-left'
}

export const SizeSm = Template.bind({})

export const SizeSmSelectedFocused = Template.bind({})
SizeSmSelectedFocused.args = {
  initValue: 'top-left'
}
SizeSmSelectedFocused.play = focusCombobox

export const SizeSmFocused = Template.bind({})
SizeSmFocused.play = focusCombobox

export const SizeSmSelectedOpen = Template.bind({})
SizeSmSelectedOpen.args = {
  initValue: 'top-left'
}
SizeSmSelectedOpen.play = openCombobox

export const SizeSmOpen = Template.bind({})
SizeSmOpen.play = openCombobox

export const SizeSmSelectedDisabled = Template.bind({})
SizeSmSelectedDisabled.args = {
  initValue: 'top-left',
  disabled: true
}

export const SizeSmDisabled = Template.bind({})
SizeSmDisabled.args = { disabled: true }

export const MultiselectSizeSmSelected = Template.bind({})
MultiselectSizeSmSelected.args = {
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}

export const MultiselectSizeSmSelectedFocused = Template.bind({})
MultiselectSizeSmSelectedFocused.args = {
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}
MultiselectSizeSmSelectedFocused.play = focusCombobox

export const MultiselectSizeSmSelectedOpen = Template.bind({})
MultiselectSizeSmSelectedOpen.args = {
  classes: 'w-[200px]',
  initValue: ['top-left', 'center-right']
}
MultiselectSizeSmSelectedOpen.play = openCombobox

export const MultiselectSizeSmSelectedDisabled = Template.bind({})
MultiselectSizeSmSelectedDisabled.args = {
  classes: 'w-[200px]',
  disabled: true,
  initValue: ['top-left', 'center-right']
}

export const MultiselectSizeSm = Template.bind({})
MultiselectSizeSm.args = {
  classes: 'w-[200px]',
  initValue: []
}

export const MultiselectSizeSmFocused = Template.bind({})
MultiselectSizeSmFocused.args = {
  classes: 'w-[200px]',
  initValue: []
}
MultiselectSizeSmFocused.play = focusCombobox

export const MultiselectSizeSmOpen = Template.bind({})
MultiselectSizeSmOpen.args = {
  classes: 'w-[200px]',
  initValue: []
}
MultiselectSizeSmOpen.play = openCombobox

export const MultiselectSizeSmDisabled = Template.bind({})
MultiselectSizeSmDisabled.args = {
  classes: 'w-[200px]',
  disabled: true,
  initValue: []
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  size: 'md',
  classes: 'w-full'
}
FullWidth.play = openCombobox

export const HalfWidth = Template.bind({})
HalfWidth.args = {
  size: 'md',
  classes: 'w-1/2'
}
HalfWidth.play = openCombobox

export const StaticWidth = Template.bind({})
StaticWidth.args = {
  size: 'md',
  classes: 'w-[10rem]'
}
StaticWidth.play = openCombobox

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
PanelClasses.play = openCombobox

export const SubtleSelected = Template.bind({})
SubtleSelected.args = {
  variant: 'subtle',
  initValue: 'top-left'
}

export const Subtle = Template.bind({})
Subtle.args = {
  variant: 'subtle'
}

export const SubtleSelectedFocused = Template.bind({})
SubtleSelectedFocused.args = {
  variant: 'subtle',
  initValue: 'top-left'
}
SubtleSelectedFocused.play = focusCombobox

export const SubtleFocused = Template.bind({})
SubtleFocused.args = {
  variant: 'subtle'
}
SubtleFocused.play = focusCombobox

export const SubtleSelectedOpen = Template.bind({})
SubtleSelectedOpen.args = {
  variant: 'subtle',
  initValue: 'top-left'
}
SubtleSelectedOpen.play = openCombobox

export const SubtleOpen = Template.bind({})
SubtleOpen.args = {
  variant: 'subtle'
}
SubtleOpen.play = openCombobox

export const SubtleSelectedDisabled = Template.bind({})
SubtleSelectedDisabled.args = {
  variant: 'subtle',
  initValue: 'top-left',
  disabled: true
}

export const SubtleDisabled = Template.bind({})
SubtleDisabled.args = {
  variant: 'subtle',
  disabled: true
}

export const MultiselectSubtleSelected = Template.bind({})
MultiselectSubtleSelected.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: ['top-left', 'center-right']
}

export const MultiselectSubtleSelectedFocused = Template.bind({})
MultiselectSubtleSelectedFocused.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: ['top-left', 'center-right']
}
MultiselectSubtleSelectedFocused.play = focusCombobox

export const MultiselectSubtleSelectedOpen = Template.bind({})
MultiselectSubtleSelectedOpen.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: ['top-left', 'center-right']
}
MultiselectSubtleSelectedOpen.play = openCombobox

export const MultiselectSubtleSelectedDisabled = Template.bind({})
MultiselectSubtleSelectedDisabled.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  disabled: true,
  initValue: ['top-left', 'center-right']
}

export const MultiselectSubtle = Template.bind({})
MultiselectSubtle.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: []
}

export const MultiselectSubtleFocused = Template.bind({})
MultiselectSubtleFocused.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: []
}
MultiselectSubtleFocused.play = focusCombobox

export const MultiselectSubtleOpen = Template.bind({})
MultiselectSubtleOpen.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  initValue: []
}
MultiselectSubtleOpen.play = openCombobox

export const MultiselectSubtleDisabled = Template.bind({})
MultiselectSubtleDisabled.args = {
  classes: 'w-[200px]',
  variant: 'subtle',
  disabled: true,
  initValue: []
}

const TemplateCustomOptions: StoryFn = (args, meta) => ({
  components: { ACombobox, AOption },
  setup() {
    const inputValue = ref(args.initValue)
    const options = [
      { value: '#ff0000', label: 'Red' },
      { value: '#00ff00', label: 'Green' },
      { value: '#0000ff', label: 'Blue' }
    ]
    const selectedLabel = computed(
      () => options.find(x => inputValue.value === x.value)?.label || 'Unset'
    )
    const customFilter = (option: { value: string; label: string }, query: string) =>
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.value.toLowerCase().includes(query.toLowerCase())

    const bgStyle = (color: string) => {
      return `background-color: ${color};`
    }

    return {
      args,
      story: meta.name,
      options,
      customFilter,
      inputValue,
      selectedLabel,
      bgStyle,
      multi: Array.isArray(inputValue.value)
    }
  },
  template: ` 
  <div class="bg-white h-[200px] p-4">
    <p class="mb-2 body-lg">{{story}}</p> 
    <p class="mt-2 body-xs">Selected value: {{JSON.stringify(inputValue)}}</p> 
    <ACombobox v-bind="args" v-model="inputValue" :options="options" class="w-[12rem]" :filter-callback="customFilter">
      <template #default="{filteredOptions}">
        <AOption v-for="option in filteredOptions" :key="option.value" component="combobox" :option="option" :multi="multi">
          <template #extra>
            <div class="w-4 h-4 border rounded shrink-0" :class="[multi? 'mr-2' : 'ml-2']" :style="bgStyle(option.value)"></div>
          </template>
          <span>{{ option.label }}</span>
          <span class="text-warsaw mx-2">({{option.value}})</span>
        </AOption>
      </template>
    </ACombobox>
  </div>`
})

export const CustomOptions = TemplateCustomOptions.bind({})
CustomOptions.args = {
  initValue: ''
}
CustomOptions.play = openCombobox

export const CustomOptionsFiltered = TemplateCustomOptions.bind({})
CustomOptionsFiltered.args = {
  initValue: ''
}
CustomOptionsFiltered.play = args => typeIntoCombobox(args, 'ff0')

export const MultiselectCustomOptions = TemplateCustomOptions.bind({})
MultiselectCustomOptions.args = {
  initValue: []
}
MultiselectCustomOptions.play = openCombobox

export const MultiselectCustomOptionsFiltered = TemplateCustomOptions.bind({})
MultiselectCustomOptionsFiltered.args = {
  initValue: []
}
MultiselectCustomOptionsFiltered.play = args => typeIntoCombobox(args, 'ff0')

const TemplateDynamicOption: StoryFn = (args, meta) => ({
  components: { ACombobox, AOption },
  setup() {
    const comboboxValue = ref(args.initValue)
    const options = ref([
      { value: 'first', label: 'First' },
      { value: 'second', label: 'Second' },
      { value: 'third', label: 'Third' }
    ])
    const createNewOption = (value: string | string[]) => {
      if (value.length === 0) {
        return
      }
      const newValue = typeof value === 'string' ? value : value[value.length - 1]
      if (!options.value.filter(option => option.value === newValue).length) {
        options.value.push({ value: newValue, label: newValue })
        alert(
          `${newValue} added to the options list and selected. You can do other stuff with it too :)`
        )
      }
    }
    return {
      args,
      story: meta.name,
      createNewOption,
      options,
      comboboxValue
    }
  },
  template: `
      <div class="bg-white h-[200px] p-4">
        <p class="mb-2 body-lg">{{story}}</p>
        <p class="mt-2 body-xs">Selected value: {{JSON.stringify(comboboxValue)}}</p>
        <ACombobox v-bind="args" v-model="comboboxValue" @update:model-value="createNewOption" :options="options" class="w-[10rem]">
          <template #custom-option="{query}" >
            <AOption component="combobox" :option="{label: 'create ' + query, value: query}">
            </AOption>
          </template>
        </ACombobox>
      </div>
    `
})

export const DynamicOption = TemplateDynamicOption.bind({})
DynamicOption.args = {
  initValue: ''
}
DynamicOption.play = args => typeIntoCombobox(args, 'new item')

export const MultiselectDynamicOption = TemplateDynamicOption.bind({})
MultiselectDynamicOption.args = {
  initValue: []
}
MultiselectDynamicOption.play = args => typeIntoCombobox(args, 'new item')

const TemplateBackendOptions: StoryFn = (args, meta) => ({
  components: { ACombobox, AOption, AColorCircle },
  setup() {
    const inputValue: Ref<string | string[]> = ref(args.initValue)
    const options: Ref<Option[]> = ref([])
    const loading = ref(false)
    let requestId: NodeJS.Timeout

    const searchOptions = async (query: string) => {
      loading.value = true
      let selectedOptions: Option[] = []
      if (Array.isArray(inputValue.value)) {
        selectedOptions = options.value.filter(option => inputValue.value.includes(option.value))
      }
      options.value = [...selectedOptions]
      clearTimeout(requestId)
      if (query.trim()) {
        requestId = setTimeout(() => {
          options.value = [
            ...selectedOptions,
            { value: query, label: `label ${query}` },
            { value: `${query}-2`, label: `Another ${query}` },
            { value: `${query}-moon`, label: `${query} on the moon` }
          ]

          loading.value = false
        }, 500)
      } else {
        loading.value = false
      }
    }

    return {
      args,
      story: meta.name,
      options,
      inputValue,
      searchOptions,
      loading
    }
  },
  template: ` 
  <div class="bg-white h-[200px] p-4">
    <p class="mb-2 body-lg">{{story}}</p> 
    <p class="mt-2 body-xs">Selected value: {{JSON.stringify(inputValue)}}</p> 
    <ACombobox v-bind="args" v-model="inputValue"  @update:query="searchOptions" :options="options" class="w-[10rem]" :filter-callback="() => true">
      <template #custom-option="{query}">
        <div v-if="loading" class="px-2">Searching "{{query}}"...</div>
      </template>
    </ACombobox>
  </div>`
})

export const BackendOptions = TemplateBackendOptions.bind({})
BackendOptions.args = {
  initValue: ''
}
BackendOptions.play = args => typeIntoCombobox(args, 'test')

export const MultiselectBackendOptions = TemplateBackendOptions.bind({})
MultiselectBackendOptions.args = {
  initValue: []
}
MultiselectBackendOptions.play = args => typeIntoCombobox(args, 'test')

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  options: [
    defaultOptions[0],
    { value: 'bottom-left', label: 'Bottom Left', disabled: true },
    defaultOptions[2]
  ]
}
DisabledOption.play = openCombobox

export const MultiselectDisabledOption = Template.bind({})
MultiselectDisabledOption.args = {
  options: [
    defaultOptions[0],
    { value: 'bottom-left', label: 'Bottom Left', disabled: true },
    { value: 'center-left', label: 'Center Left', disabled: true }
  ],
  initValue: ['center-left']
}
MultiselectDisabledOption.play = openCombobox

const groupedOptionsData = [
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
  options: groupedOptionsData,
  classes: 'w-[10rem] h-[20rem]'
}
GroupedOptions.play = openCombobox

export const MultiselectGroupedOptions = Template.bind({})
MultiselectGroupedOptions.args = {
  initValue: [],
  options: groupedOptionsData,
  classes: 'w-[10rem] h-[20rem]'
}
MultiselectGroupedOptions.play = openCombobox

const longOptions = [
  { value: '#ff0000', label: 'The reddest red you have ever seen' },
  { value: '#00ff00', label: "A green greener than the neighbor's green grass" },
  { value: '#0000ff', label: "I'm blue Da ba dee da ba di" }
]

export const LongLabelOptionsOpen = Template.bind({})
LongLabelOptionsOpen.args = {
  options: longOptions
}
LongLabelOptionsOpen.play = openCombobox

export const LongLabelOptionsSelected = Template.bind({})
LongLabelOptionsSelected.args = {
  initValue: '#00ff00',
  options: longOptions
}

export const MultiselectLongLabelOptionsSelectedOpen = Template.bind({})
MultiselectLongLabelOptionsSelectedOpen.args = {
  initValue: ['#00ff00'],
  options: longOptions
}
MultiselectLongLabelOptionsSelectedOpen.play = openCombobox

export const DirectionUp = Template.bind({})
DirectionUp.args = {
  initValue: '',
  direction: 'up'
}
DirectionUp.play = openCombobox

export const MultiselectDirectionUp = Template.bind({})
MultiselectDirectionUp.args = {
  initValue: ['top-left'],
  direction: 'up'
}
MultiselectDirectionUp.play = openCombobox

export const Inline = Template.bind({})
Inline.args = {
  inline: true
}

export const MultiselectInline = Template.bind({})
MultiselectInline.args = {
  initValue: [],
  inline: true
}

export const MultiselectInlineSelected = Template.bind({})
MultiselectInlineSelected.args = {
  initValue: ['top-left'],
  inline: true
}

export const CustomModelValue = Template.bind({})
CustomModelValue.args = {
  initValue: 'Mixed'
}
CustomModelValue.play = openCombobox

export const MultiselectCustomModelValue = Template.bind({})
MultiselectCustomModelValue.args = {
  classes: 'w-[200px]',
  initValue: ["I'm special"]
}
MultiselectCustomModelValue.play = openCombobox

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
OptionsWithColor.play = openCombobox

export const OptionsWithColorSelected = Template.bind({})
OptionsWithColorSelected.args = {
  options: optionsWithColors,
  initValue: '',
  classes: 'w-[200px]'
}
OptionsWithColorSelected.play = selectOption

export const MultiselectOptionsWithColor = Template.bind({})
MultiselectOptionsWithColor.args = {
  options: optionsWithColors,
  initValue: []
}
MultiselectOptionsWithColor.play = openCombobox

export const MultiselectOptionsWithColorSelected = Template.bind({})
MultiselectOptionsWithColorSelected.args = {
  options: optionsWithColors,
  initValue: []
}
MultiselectOptionsWithColorSelected.play = selectOption

const TemplateOverflow: StoryFn = () => ({
  components: { ACombobox },
  template: `
    <div class="relative h-[15rem]">
      <div class="border border-sanfran h-16 overflow-auto w-[20rem] flex flex-col px-2">
        <div class="text-sanfran">Overflow container</div>
        <ACombobox escape-overflow class="flex-1" model-value="" :options="[{ value: 0, label: 'Graphic' }, { value: 1, label: 'Rendered' }, { value: 2, label: 'Black and white' }]" />
      </div>
    </div>`
})

export const OverflowContainer = TemplateOverflow.bind({})
OverflowContainer.play = openCombobox
