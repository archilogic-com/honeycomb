<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { Listbox, ListboxButton } from '@headlessui/vue'

import type { Option } from './Option.vue'
import { OptionGroup, areOptionsGrouped } from './OptionGroup.vue'
import AColorCircle from './ColorCircle.vue'
import OptionsPanel, { Direction } from './internal/OptionsPanel.vue'
import FloatingArrow from './internal/FloatingArrow.vue'

export default defineComponent({
  name: 'AListbox',
  components: {
    Listbox,
    ListboxButton,
    OptionsPanel,
    FloatingArrow,
    AColorCircle
  },
  props: {
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of listbox options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: {
      type: Array as PropType<Option[] | OptionGroup[]>,
      required: true
    },
    /**
     * an optional placeholder can be displayed when no value is currently selected.
     */
    placeholder: {
      type: String,
      default: 'Select value'
    },
    /**
     * the size of the listbox component
     */
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'sm'
    },
    /**
     * how the listbox button is displayed when not focused
     */
    variant: {
      type: String as PropType<'subtle' | 'default'>,
      default: 'default'
    },
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component.
     */
    modelValue: {
      type: String,
      required: true
    },
    /**
     * direction in which the dropdown is opening.
     * possible values: `up`, `down`. Default is `down`
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'down'
    },
    /**
     * extra classes to style the listbox options panel
     * useful for setting the panel height
     */
    panelClasses: {
      type: String,
      default: ''
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
  emits: ['update:modelValue'],
  setup() {
    const listboxButton = ref()
    const optionsPanelWidth = computed(() => listboxButton.value?.el.offsetWidth)

    // hack together a tab-out behavior for the listbox
    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const newEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        event.target?.dispatchEvent(newEvent)
      }
    }

    return { handleTab, listboxButton, optionsPanelWidth }
  },
  computed: {
    flatOptions() {
      return areOptionsGrouped(this.options)
        ? this.options.map(({ options }) => options).flat()
        : this.options
    },
    valueOption() {
      return this.flatOptions.find(option => option.value === this.model)
    },
    valueLabel() {
      return this.valueOption?.label || this.model
    },
    model: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>
<template>
  <Listbox v-model="model" as="div" class="group" :class="{ 'relative': !escapeOverflow }">
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
              <AColorCircle v-if="valueOption?.color" :color="valueOption?.color" class="mr-2" />
              <span>{{ valueLabel }}</span>
            </div>
            <span v-else class="a-text-input-placeholder">{{ placeholder }}</span>
          </slot>
        </div>
        <FloatingArrow
          v-if="!inline"
          :float="variant === 'subtle' && !$attrs.disabled"
          :class="{ 'text-warsaw': $attrs.disabled }" />
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
