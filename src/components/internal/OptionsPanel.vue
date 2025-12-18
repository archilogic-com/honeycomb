<script lang="ts">
export type Direction = 'up' | 'down'
</script>

<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { ListboxOptions, ComboboxOptions } from '@headlessui/vue'
import AOption from '../Option.vue'
import AOptionGroup from '../OptionGroup.vue'
import ASelectableOptionGroup from '../SelectableOptionGroup.vue'
import {
  type BaseOption,
  type ExtendedOption,
  type OptionGroup,
  areOptionsGrouped
} from '../../types/selection'

const optionsComponents = {
  listbox: ListboxOptions,
  combobox: ComboboxOptions
}

withDefaults(
  defineProps<{
    /**
     * the component inside of which the option is rendered
     *
     * `'listbox' | 'combobox'`
     */
    component?: 'listbox' | 'combobox'
    /**
     * An option is at the minimum a `{ value: string, label: string }` object.
     * This prop is used to display the list of options,
     * as well as the correct label of the currently selected value.
     *
     * You can also provide a grouped structure of options: `[{ title: string, options: Option[] }]`
     */
    options: T[] | OptionGroup<string, T>[]
    /**
     * direction in which the dropdown is opening.
     * possible values: `up`, `down`. Default is `down`
     */
    direction?: Direction
    /**
     * the sizing of the component
     */
    size?: 'sm' | 'md'
    /**
     * whether the options are rendered in multiselect combobox
     */
    multi?: boolean
    /**
     * whether the options panel is rendered inline
     */
    inline?: boolean
    /**
     * allow the options panel to be rendered outside the flow of a container that has content that needs scrolling
     */
    escapeOverflow?: boolean
    /**
     * width of the panel in pixels, to be provided when escapeOverflow is true
     */
    width?: number
    /**
     * whether to show selectable checkboxes in group headers
     */
    selectableGroups?: boolean
    /**
     * current selection values for computing group selection state
     */
    selectedValues?: string[]
  }>(),
  {
    component: 'listbox',
    direction: 'down',
    size: 'sm',
    multi: false,
    inline: false,
    escapeOverflow: false,
    width: 0,
    selectableGroups: false,
    selectedValues: () => []
  }
)

const isGrouped = (opts: T[] | OptionGroup<string, T>[]): opts is OptionGroup<string, T>[] => {
  return areOptionsGrouped(opts)
}
</script>
<template>
  <component
    :is="optionsComponents[component]"
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
      <template v-if="isGrouped(options)">
        <!-- use SelectableOptionGroup when selectableGroups is enabled -->
        <template v-if="selectableGroups">
          <ASelectableOptionGroup
            v-for="group in options"
            :key="group.title || String(group.options[0].value)"
            :title="group.title || ''"
            :options="group.options"
            :model-value="selectedValues" />
        </template>
        <template v-else>
          <AOptionGroup
            v-for="group in options"
            :key="group.title || String(group.options[0].value)"
            :component="component"
            :options="group.options"
            :title="group.title"
            :multi="multi" />
        </template>
      </template>
      <template v-else>
        <AOption
          v-for="option in options"
          :key="String(option.value)"
          :component="component"
          :option="option"
          :multi="multi"></AOption>
      </template>
    </slot>
    <!-- @slot named `#extra` slot for additional content, like custom options or "no results" element-->
    <slot name="extra"></slot>
  </component>
</template>
