<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ListboxOptions, ComboboxOptions } from '@headlessui/vue'
import AOption, { Option } from '../Option.vue'
import AOptionGroup, { OptionGroup, areOptionsGrouped } from '../OptionGroup.vue'
import ASelectableOptionGroup from '../SelectableOptionGroup.vue'

export type Direction = 'up' | 'down'

export default defineComponent({
  name: 'OptionsPanel',
  components: { ListboxOptions, ComboboxOptions, AOption, AOptionGroup, ASelectableOptionGroup },
  props: {
    /**
     * the component inside of which the option is rendered
     *
     * `'listbox' | 'combobox'`
     */
    component: {
      type: String as PropType<'listbox' | 'combobox'>,
      default: 'listbox'
    },
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: {
      type: Array as PropType<Option[] | OptionGroup[]>,
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
     * the sizing of the component
     */
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'sm'
    },
    /**
     * whether the options are rendered in multiselect combobox
     */
    multi: {
      type: Boolean,
      default: false
    },
    /**
     * whether the options panel is rendered inline
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
    },
    /**
     * width of the panel in pixels, to be provided when escapeOverflow is true
     */
    width: {
      type: Number,
      default: 0
    },
    /**
     * whether to show selectable checkboxes in group headers
     */
    selectableGroups: {
      type: Boolean,
      default: false
    },
    /**
     * current selection values for computing group selection state
     */
    selectedValues: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup() {
    return { areOptionsGrouped }
  }
})
</script>
<template>
  <component
    :is="`${component}-options`"
    as="div"
    :static="inline"
    class="focus-visible:outline-none"
    :class="[
      {
        'bottom-full': direction === 'up',
        'my-1': size === 'md' && !inline,
        'mt-[3px] mb-1': size === 'sm' && !inline,
        'body-sm': size === 'sm',
        'body-md': size === 'md',
        'mt-2 w-unset': inline && !escapeOverflow,
        'a-panel-sm absolute z-10 py-2': !inline && escapeOverflow,
        'a-panel-sm absolute left-0 z-10 min-w-full max-w-full py-2': !inline && !escapeOverflow
      }
    ]"
    :style="escapeOverflow && width && `width: ${width}px`">
    <!-- @slot  `#default` slot. Takes `a-option` or `a-option-group` components without any wrappers. Use this slot to render options with extra styles or markup. Default value: `options` prop rendered as `a-option`s or `a-option-group`s -->
    <slot>
      <template v-if="areOptionsGrouped(options)">
        <!-- use SelectableOptionGroup when selectableGroups is enabled -->
        <template v-if="selectableGroups">
          <ASelectableOptionGroup
            v-for="group in options"
            :key="group.title || group.options[0].value"
            :title="group.title || ''"
            :options="group.options"
            :model-value="selectedValues" />
        </template>
        <template v-else>
          <AOptionGroup
            v-for="group in options"
            :key="group.title || group.options[0].value"
            :component="component"
            :options="group.options"
            :title="group.title"
            :multi="multi" />
        </template>
      </template>
      <template v-else>
        <AOption
          v-for="option in options"
          :key="option.value"
          :component="component"
          :option="option"
          :multi="multi"></AOption>
      </template>
    </slot>
    <!-- @slot named `#extra` slot for additional content, like custom options or "no results" element-->
    <slot name="extra"></slot>
  </component>
</template>
