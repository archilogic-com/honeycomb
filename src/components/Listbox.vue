<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { ref, computed, useAttrs } from 'vue'
import { Listbox, ListboxButton } from '@headlessui/vue'
import AColorCircle from './ColorCircle.vue'
import OptionsPanel, { type Direction } from './internal/OptionsPanel.vue'
import FloatingArrow from './internal/FloatingArrow.vue'
import {
  type BaseOption,
  type ExtendedOption,
  type OptionGroup,
  areOptionsGrouped
} from '../types/selection'
import { type Color } from '../colors'

const props = withDefaults(
  defineProps<{
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of listbox options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: T[] | OptionGroup<string, T>[]
    /**
     * an optional placeholder can be displayed when no value is currently selected.
     */
    placeholder?: string
    /**
     * the size of the listbox component
     */
    size?: 'sm' | 'md'
    /**
     * how the listbox button is displayed when not focused
     */
    variant?: 'subtle' | 'default'
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component.
     */
    modelValue: string
    /**
     * direction in which the dropdown is opening.
     * possible values: `up`, `down`. Default is `down`
     */
    direction?: Direction
    /**
     * extra classes to style the listbox options panel
     * useful for setting the panel height
     */
    panelClasses?: string
    /**
     * the options panel can be rendered inline instead of the absolutely positioned dropdown
     */
    inline?: boolean
    /**
     * allow the options panel to be rendered outside the flow of a container that has content that needs scrolling
     */
    escapeOverflow?: boolean
  }>(),
  {
    placeholder: 'Select value',
    size: 'sm',
    variant: 'default',
    direction: 'down',
    panelClasses: '',
    inline: false,
    escapeOverflow: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const listboxButton = ref()
const optionsPanelWidth = computed(() => listboxButton.value?.el.offsetWidth)

// hack together a tab-out behavior for the listbox
const handleTab = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    const newEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    event.target?.dispatchEvent(newEvent)
  }
}

const flatOptions = computed(() =>
  areOptionsGrouped(props.options)
    ? props.options.map(({ options }) => options).flat()
    : props.options
)

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const valueOption = computed(() => flatOptions.value.find(option => option.value === model.value))

const valueLabel = computed(() => valueOption.value?.label || model.value)

// Type-safe color access
const valueOptionColor = computed(() => {
  const opt = valueOption.value as (BaseOption & { color?: Color }) | undefined
  return opt?.color
})
</script>
<template>
  <Listbox v-model="model" as="div" class="group" :class="{ relative: !escapeOverflow }">
    <ListboxButton
      ref="listboxButton"
      class="a-text-input flex items-center group-focus-within:a-text-input-focus"
      :class="[
        size === 'md' ? 'a-text-input--md' : 'a-text-input--sm',
        variant === 'subtle' ? 'a-text-input--subtle' : 'a-text-input--default'
      ]">
      <!--
            @slot Named `#listbox-button` slot. An "escape hatch" slot to render custom trigger button styles or markup. Not recommended unless you know what you're doing. Default value: currently selected value or placeholder if empty, as well as chevron-down icon. If overwriting, make sure to provide appropriate hover, focus and disabled styles.
          -->
      <slot name="listbox-button">
        <div class="truncate" :class="variant !== 'subtle' && 'mr-auto'">
          <!--
            @slot Named `#listbox-value` slot. Use to render a custom 'selected state' or extra markup that needs to be styled. Default value: currently selected value or placeholder if empty.
          -->
          <slot name="listbox-value">
            <div v-if="model" class="truncate">
              <AColorCircle v-if="valueOptionColor" :color="valueOptionColor" class="mr-2" />
              <span>{{ valueLabel }}</span>
            </div>
            <span v-else class="a-text-input-placeholder">{{ placeholder }}</span>
          </slot>
        </div>
        <FloatingArrow
          v-if="!inline"
          :float="variant === 'subtle' && !attrs.disabled"
          :class="{ 'text-warsaw': attrs.disabled }" />
      </slot>
    </ListboxButton>
    <OptionsPanel
      :size="size"
      :options="options"
      :class="panelClasses"
      :direction="direction"
      :inline="inline"
      :escape-overflow="escapeOverflow"
      :width="optionsPanelWidth"
      @keyup="handleTab">
      <slot></slot>
    </OptionsPanel>
  </Listbox>
</template>
