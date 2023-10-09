<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { Combobox, ComboboxButton, ComboboxInput } from '@headlessui/vue'

import type { Option } from './Option.vue'
import { OptionGroup, areOptionsGrouped } from './OptionGroup.vue'
import ATag from './Tag.vue'
import AColorCircle from './ColorCircle.vue'
import OptionsPanel, { Direction } from './internal/OptionsPanel.vue'
import FloatingArrow from './internal/FloatingArrow.vue'

export default defineComponent({
  name: 'ACombobox',
  components: {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    OptionsPanel,
    ATag,
    FloatingArrow,
    AColorCircle
  },
  props: {
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of combobox options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: {
      type: Array as PropType<Option[] | OptionGroup[]>,
      required: true
    },
    /**
     * a placeholder string to be displayed when no value is currently selected.
     */
    placeholder: {
      type: String,
      default: 'Select value'
    },
    /**
     * the size of the combobox component
     * same as text inputs and listboxes
     *
     * `'sm' | 'md'`
     */
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'sm'
    },
    /**
     * visual variant, same as text inputs and listboxes
     * how the combobox button is displayed when not focused
     *
     * `'subtle' | 'default'`
     */
    variant: {
      type: String as PropType<'subtle' | 'default'>,
      default: 'default'
    },
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component.
     * When a single option can be selected, modelValue must be a string.
     * When multiple options can be selected, modelValue must be a list of strings.
     */
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      required: true
    },
    /**
     * direction in which the dropdown is opening.
     *
     * `'up' | 'down'`
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'down'
    },
    /**
     * extra classes to style the combobox options panel
     * useful for setting the panel height
     */
    panelClasses: {
      type: String,
      default: ''
    },
    /**
     * an optional custom filtering function to filter the results based on the user input
     * the default filtering function shows an option if its label property includes the user query
     */
    filterCallback: {
      type: Function as PropType<(option: Option, query: string) => boolean>,
      default: undefined
    },
    /**
     * the options panel can be rendered inline instead of the absolutely positioned dropdown
     */
    inline: {
      type: Boolean,
      default: false
    },
    /**
     * allow the options panel to be rendered outside the flow of a container that has content that needs scrolling
     */
    escapeOverflow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:query'],
  setup(props, { emit }) {
    const isMultiSelect = (modelValue: string[] | string): modelValue is string[] => {
      return Array.isArray(modelValue)
    }

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

    const model = computed({
      get: () => {
        return props.modelValue
      },
      set: value => {
        if (isMultiSelect(model.value)) {
          query.value = ''
        }
        emit('update:modelValue', value)
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
        const applyFilter = (option: Option) =>
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
      return flatOptions.value.find(option => option.value === value)
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

    const singleModelValueColor = computed(() => {
      if (!isMultiSelect(model.value)) {
        return getOption(model.value)?.color
      }
      return undefined
    })

    const handleDelete = () => {
      if (isMultiSelect(model.value) && !query.value) {
        model.value = model.value.slice(0, -1)
      }
    }

    return {
      model,
      filteredOptions,
      query,
      displayValue,
      updateQuery,
      isMultiSelect: computed(() => isMultiSelect(model.value)),
      removeValue,
      getOption,
      inputSize,
      inputRef,
      selectInputValue,
      singleModelValueColor,
      placeholderString,
      handleDelete,
      comboboxButton,
      optionsPanelWidth,
      clearQuery
    }
  }
})
</script>
<template>
  <Combobox
    v-model="model"
    as="div"
    :class="{ relative: !escapeOverflow }"
    :multiple="isMultiSelect">
    <!-- @slot  named `#input` slot. Requires ComboboxInput component from headless-ui to work, and optionally ComboboxButton. Slot props: `query<string>`, calculated `displayValue<string>`, and `updateQuery<(value:string)=>void>` callback to be used with text input v-model update event-->
    <slot name="input" :query="query" :display-value="displayValue" :update-query="updateQuery">
      <ComboboxButton
        ref="comboboxButton"
        as="div"
        class="group a-text-input-base relative flex items-center py-0"
        :class="[
          {
            'h-auto min-h-10 body-lg placeholder:body-lg': size === 'md' && isMultiSelect,
            'my-px h-auto min-h-[1.875rem] body-sm placeholder:body-sm':
              size === 'sm' && isMultiSelect,
            'a-text-input--sm': size === 'sm' && !isMultiSelect,
            'a-text-input--md': size === 'md' && !isMultiSelect
          },
          variant === 'subtle' ? 'a-text-input--subtle' : 'a-text-input--default',
          $attrs.disabled
            ? 'a-text-input-disabled border-athens'
            : 'focus-within:a-text-input-focus hover:a-text-input-hover',
          variant === 'subtle' && $attrs.disabled && 'border-none'
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
          <template v-if="isMultiSelect && !inline">
            <ATag
              v-for="value in model"
              :key="value"
              :removable="!($attrs.disabled || getOption(value)?.disabled)"
              :color="getOption(value)?.color"
              @remove="removeValue(value, $event)">
              {{ getOption(value)?.label || value }}
            </ATag>
          </template>
          <AColorCircle
            v-if="singleModelValueColor"
            :color="singleModelValueColor"
            class="mr-1"></AColorCircle>
          <ComboboxInput
            ref="inputRef"
            class="truncate bg-transparent focus:focus-none disabled:a-text-input-disabled"
            :style="`width: ${inputSize + 1}ch`"
            :display-value="value => displayValue(value as string | string[])"
            :placeholder="placeholderString"
            :disabled="$attrs.disabled"
            @blur="clearQuery"
            @change.stop="updateQuery($event.target.value)" />
        </div>
        <FloatingArrow
          v-if="!inline"
          :float="variant === 'subtle' && !$attrs.disabled"
          :class="$attrs.disabled && 'text-warsaw'" />
      </ComboboxButton>
    </slot>
    <OptionsPanel
      component="combobox"
      :size="size"
      :options="filteredOptions"
      :class="panelClasses"
      :direction="direction"
      :multi="isMultiSelect"
      :inline="inline"
      :escape-overflow="escapeOverflow"
      :width="optionsPanelWidth">
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
</template>
