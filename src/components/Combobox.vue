<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { ref, computed, useAttrs } from 'vue'
import { Combobox, ComboboxButton, ComboboxInput } from '@headlessui/vue'
import ATag from './Tag.vue'
import AColorCircle from './ColorCircle.vue'
import OptionsPanel, { type Direction } from './internal/OptionsPanel.vue'
import FloatingArrow from './internal/FloatingArrow.vue'
import {
  type BaseOption,
  type ExtendedOption,
  type OptionGroup,
  areOptionsGrouped,
  GROUP_VALUE_PREFIX
} from '../types/selection'
import { type Color } from '../colors'

const props = withDefaults(
  defineProps<{
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of combobox options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: T[] | OptionGroup<string, T>[]
    /**
     * a placeholder string to be displayed when no value is currently selected.
     */
    placeholder?: string
    /**
     * the size of the combobox component
     * same as text inputs and listboxes
     *
     * `'sm' | 'md'`
     */
    size?: 'sm' | 'md'
    /**
     * visual variant, same as text inputs and listboxes
     * how the combobox button is displayed when not focused
     *
     * `'subtle' | 'default'`
     */
    variant?: 'subtle' | 'default'
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component.
     * When a single option can be selected, modelValue must be a string.
     * When multiple options can be selected, modelValue must be a list of strings.
     */
    modelValue: string | string[]
    /**
     * direction in which the dropdown is opening.
     *
     * `'up' | 'down'`
     */
    direction?: Direction
    /**
     * extra classes to style the combobox options panel
     * useful for setting the panel height
     */
    panelClasses?: string
    /**
     * an optional custom filtering function to filter the results based on the user input
     * the default filtering function shows an option if its label property includes the user query
     */
    filterCallback?: (option: T, query: string) => boolean
    /**
     * the options panel can be rendered inline instead of the absolutely positioned dropdown
     */
    inline?: boolean
    /**
     * allow the options panel to be rendered outside the flow of a container that has content that needs scrolling
     */
    escapeOverflow?: boolean
    /**
     * Maximum number of tags to display in multi-select mode.
     * When exceeded, remaining selections are collapsed into a "+N more" indicator.
     * Set to `undefined` (default) to display all tags.
     */
    maxTags?: number
    /**
     * Custom function to generate the collapsed tags label.
     * Receives the count of hidden tags.
     * Default: `(count) => \`+${count} more\``
     */
    collapsedTagsLabel?: (count: number) => string
    /**
     * When true and the combobox is in multi-select mode with grouped options,
     * displays a CheckboxSelectAll in each group header to select/clear all
     * options in that group.
     */
    selectableGroups?: boolean
  }>(),
  {
    placeholder: 'Select value',
    size: 'sm',
    variant: 'default',
    direction: 'down',
    panelClasses: '',
    inline: false,
    escapeOverflow: false,
    collapsedTagsLabel: (count: number) => `+${count} more`,
    selectableGroups: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  'update:query': [query: string]
}>()

const attrs = useAttrs()

const isMultiSelect = (modelValue: string[] | string): modelValue is string[] => {
  return Array.isArray(modelValue)
}

const container = ref()
const query = ref('')
const inputRef = ref()
const comboboxButton = ref()
const optionsPanelWidth = computed(() => comboboxButton.value?.el.offsetWidth)

const selectInputValue = () => {
  if (inputRef.value) {
    const element = inputRef.value.$el as HTMLInputElement
    element.select()
  }
}

// toggle all options in a group (select all if not all selected, otherwise clear)
const handleGroupToggle = (options: T[]) => {
  if (!isMultiSelect(props.modelValue)) return

  const values = options.filter(o => !o.disabled).map(o => String(o.value))
  const currentSet = new Set(props.modelValue)
  const allSelected = values.every(v => currentSet.has(v))

  const newSelection = allSelected
    ? props.modelValue.filter(v => !values.includes(v))
    : [...new Set([...props.modelValue, ...values])]

  emit('update:modelValue', newSelection)
  clearQuery()
}

const model = computed({
  get: () => props.modelValue,
  set: value => {
    // handle keyboard selection of group headers (which have __group__ prefix)
    if (isMultiSelect(value) && areOptionsGrouped(props.options)) {
      const groupValue = value.find(v => v.startsWith(GROUP_VALUE_PREFIX))
      if (groupValue) {
        // extract group title and toggle its options
        const title = groupValue.slice(GROUP_VALUE_PREFIX.length)
        const group = props.options.find(g => g.title === title)
        if (group) {
          handleGroupToggle(group.options)
        }
        return
      }
    }

    emit('update:modelValue', value)
    clearQuery()
  }
})

const flatOptions = computed(() =>
  areOptionsGrouped(props.options)
    ? props.options.map(({ options }) => options).flat()
    : props.options
)

const filteredOptions = computed(() => {
  if (query.value === '') {
    return props.options
  } else {
    const applyFilter = (option: T) =>
      props.filterCallback
        ? props.filterCallback(option, query.value)
        : option.label.toLowerCase().includes(query.value.toLowerCase())

    if (areOptionsGrouped(props.options)) {
      return props.options
        .map(({ title, options }) => ({
          title,
          options: options.filter(applyFilter)
        }))
        .filter(group => group.options.length)
    } else {
      return props.options.filter(applyFilter)
    }
  }
})

const getOption = (value: string) => {
  return flatOptions.value.find(option => String(option.value) === value)
}

const displayValue = (modelValue: string | string[]) => {
  return isMultiSelect(modelValue)
    ? query.value
    : getOption(modelValue)?.label || query.value || modelValue
}

const placeholderString = computed(() =>
  isMultiSelect(model.value) && model.value.length && !props.inline ? '' : props.placeholder
)

const inputSize = computed(() => {
  const displayValueSize = displayValue(model.value).length
  const placeholderSize = placeholderString.value.length
  return displayValueSize || placeholderSize
})

const updateQuery = (value: string) => {
  if (model.value && !value && !isMultiSelect(model.value)) {
    model.value = ''
  }
  if (query.value !== value) {
    query.value = value || ''
    emit('update:query', query.value)
  }
}

const clearQuery = () => {
  query.value = ''
  emit('update:query', query.value)
}

const removeValue = (value: string, event: Event) => {
  event.stopPropagation()
  if (isMultiSelect(model.value) && model.value.includes(value)) {
    model.value = model.value.filter(item => item !== value)
  }
}

// Type-safe color access
const getOptionColor = (option: T | undefined): Color | undefined => {
  const opt = option as (BaseOption & { color?: Color }) | undefined
  return opt?.color
}

const singleModelValueColor = computed(() => {
  if (!isMultiSelect(model.value)) {
    return getOptionColor(getOption(model.value))
  }
  return undefined
})

const visibleValues = computed(() => {
  if (!isMultiSelect(model.value)) return []
  if (props.maxTags === undefined) return model.value
  return model.value.slice(0, props.maxTags)
})

const hiddenCount = computed(() => {
  if (!isMultiSelect(model.value)) return 0
  if (props.maxTags === undefined) return 0
  return Math.max(0, model.value.length - props.maxTags)
})

const showSelectableGroups = computed(
  () =>
    props.selectableGroups &&
    isMultiSelect(props.modelValue) &&
    areOptionsGrouped(props.options)
)

const handleDelete = () => {
  if (isMultiSelect(model.value) && !query.value) {
    model.value = model.value.slice(0, -1)
  }
}

const handleBlur = (event: FocusEvent) => {
  if (!container.value?.contains(event.relatedTarget)) {
    // clear query after some delay in order to wait for the dropdown to be hidden
    // avoids momentary flash of dropdown menu with unfiltered options list
    setTimeout(clearQuery, 200)
  }
}

const isMulti = computed(() => isMultiSelect(model.value))
</script>
<template>
  <div ref="container" :class="{ relative: !escapeOverflow }" @focusout="handleBlur">
    <Combobox v-model="model" :multiple="isMulti" :disabled="!!attrs.disabled">
      <!-- @slot  named `#input` slot. Requires ComboboxInput component from headless-ui to work, and optionally ComboboxButton. Slot props: `query<string>`, calculated `displayValue<string>`, and `updateQuery<(value:string)=>void>` callback to be used with text input v-model update event-->
      <slot name="input" :query="query" :display-value="displayValue" :update-query="updateQuery">
        <ComboboxButton
          ref="comboboxButton"
          as="div"
          class="group a-text-input-base relative flex items-center py-0"
          :class="[
            {
              'h-auto min-h-10 body-lg placeholder:body-lg': size === 'md' && isMulti,
              'my-px h-auto min-h-[1.875rem] body-sm placeholder:body-sm':
                size === 'sm' && isMulti,
              'a-text-input--sm': size === 'sm' && !isMulti,
              'a-text-input--md': size === 'md' && !isMulti
            },
            variant === 'subtle' ? 'a-text-input--subtle' : 'a-text-input--default',
            attrs.disabled
              ? 'a-text-input-disabled border-athens'
              : 'focus-within:a-text-input-focus hover:a-text-input-hover',
            variant === 'subtle' && attrs.disabled && 'border-none'
          ]"
          @click="selectInputValue"
          @keydown.delete="handleDelete">
          <div
            class="flex min-w-0 flex-wrap items-center truncate"
            :class="[
              size === 'md' ? 'my-[7px] gap-1' : 'my-[2px] gap-[2px]',
              {
                'mr-auto': variant !== 'subtle'
              }
            ]">
            <!-- @slot Named `#selected-tags` slot. Use to customize how selected values are displayed in multi-select mode. Slot props: `selectedValues` (all selected values), `visibleValues` (values to display respecting maxTags), `hiddenCount` (number of hidden selections), `getOption` (helper to get option details), `removeValue` (helper to remove a value), `disabled` (whether combobox is disabled) -->
            <slot
              v-if="isMulti && !inline"
              name="selected-tags"
              :selected-values="model"
              :visible-values="visibleValues"
              :hidden-count="hiddenCount"
              :get-option="getOption"
              :remove-value="removeValue"
              :disabled="attrs.disabled">
              <ATag
                v-for="value in visibleValues"
                :key="value"
                :removable="!(attrs.disabled || getOption(value)?.disabled)"
                :color="getOptionColor(getOption(value))"
                @remove="removeValue(value, $event)">
                {{ getOption(value)?.label || value }}
              </ATag>
              <span v-if="hiddenCount > 0" class="flex items-center px-1 text-stone body-xs-400">
                {{ collapsedTagsLabel(hiddenCount) }}
              </span>
            </slot>
            <AColorCircle
              v-if="singleModelValueColor"
              :color="singleModelValueColor"
              class="mr-1"></AColorCircle>
            <ComboboxInput
              ref="inputRef"
              class="truncate bg-transparent focus:focus-none disabled:a-text-input-disabled"
              :style="`width: ${inputSize + 1}ch`"
              :display-value="(value: unknown) => displayValue(value as string | string[])"
              :placeholder="placeholderString"
              :disabled="attrs.disabled"
              @change.stop="updateQuery($event.target.value)" />
          </div>
          <FloatingArrow
            v-if="!inline"
            :float="variant === 'subtle' && !attrs.disabled"
            :class="attrs.disabled && 'text-warsaw'" />
        </ComboboxButton>
      </slot>
      <OptionsPanel
        component="combobox"
        :size="size"
        :options="filteredOptions"
        :class="panelClasses"
        :direction="direction"
        :multi="isMulti"
        :inline="inline"
        :escape-overflow="escapeOverflow"
        :width="optionsPanelWidth"
        :selectable-groups="showSelectableGroups"
        :selected-values="isMulti ? (model as string[]) : []">
        <template #default>
          <!-- @slot  `#default` slot. Takes `a-option` or `a-option-group` components without any wrappers. Use this slot to render options with extra styles or markup. Default value: `options` prop rendered as `a-option`s or `a-option-group`s -->
          <slot :filtered-options="filteredOptions"></slot>
        </template>
        <template #extra>
          <!-- @slot named `#custom-option` slot. Takes `a-option` component or simple div for non-interactive elements, e.g. "no results" item. Use this slot to render a custom "no results" element, or add an extra option to create a new item. Default value: a div with centered "No options" text. Slot props: `query<string>`-->
          <slot name="custom-option" :query="query">
            <div
              v-if="filteredOptions.length === 0"
              class="flex h-8 items-center justify-center px-2 text-stone">
              No options
            </div>
          </slot>
        </template>
      </OptionsPanel>
    </Combobox>
  </div>
</template>
