<script lang="ts">
export type { Option, BaseOption, ExtendedOption, OptionValue } from '../types/selection'
</script>

<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { computed } from 'vue'
import { ListboxOption, ComboboxOption } from '@headlessui/vue'
import ACheckbox from './Checkbox.vue'
import AColorCircle from './ColorCircle.vue'
import { type Color } from '../colors'
import { type BaseOption, type ExtendedOption } from '../types/selection'

const props = withDefaults(
  defineProps<{
    /**
     * the component inside of which the option is rendered
     *
     * `'listbox' | 'combobox'`
     */
    component?: 'listbox' | 'combobox'
    /**
     * the option to be rendered
     * containing `value`, `label` and optional `disabled` properties
     *
     * alternatively pass `value` and `disabled` props directly to a-option
     * and render a label via the default slot.
     */
    option?: T
    /**
     * standalone value prop for backward compatibility
     * use when rendering custom slot content without an option object
     */
    value?: string
    /**
     * standalone disabled prop for backward compatibility
     */
    disabled?: boolean
    /**
     * whether the option is rendered in multiselect combobox (with a checkbox)
     */
    multi?: boolean
  }>(),
  {
    component: 'listbox',
    multi: false
  }
)

const componentOption = computed(() =>
  props.component === 'combobox' ? ComboboxOption : ListboxOption
)

// support both `option` prop and standalone `value`/`disabled` props
const optionValue = computed(() => props.option?.value ?? props.value)
const optionDisabled = computed(() => props.option?.disabled ?? props.disabled)
const optionLabel = computed(() => props.option?.label ?? '')

const optionColor = computed(() => {
  const opt = props.option as (BaseOption & { color?: Color }) | undefined
  return opt?.color
})
</script>
<template>
  <component
    :is="componentOption"
    v-slot="{ active, selected, disabled: slotDisabled }"
    as="template"
    :value="optionValue"
    :disabled="optionDisabled">
    <div
      class="flex min-h-8 min-w-8 items-center px-2 cursor-pointer"
      :class="{
        'bg-athens': active,
        'bg-zurich48 text-mediumblue': selected && !multi,
        'text-newyork': !selected && !slotDisabled,
        'cursor-not-allowed text-warsaw': slotDisabled
      }">
      <a-checkbox v-if="multi" readonly :model-value="selected" :disabled="slotDisabled">
        <!--
             @slot Named `#extra` slot. Use to add an icon or image preview, or any extra elements on the left-hand side of the option label.
          -->
        <slot name="extra">
          <a-color-circle v-if="optionColor" class="mr-2" :color="optionColor"></a-color-circle>
        </slot>
        <!--
            @slot `#default` slot. Use to render custom styles or extra markup for the option. Renders option label by default.
          -->
        <slot :active="active" :selected="selected" :disabled="slotDisabled" :option="option">
          <span class="truncate" :class="slotDisabled && 'text-warsaw'">
            {{ optionLabel }}
          </span>
        </slot>
      </a-checkbox>
      <template v-else>
        <span class="flex pr-2">
          <!--
             @slot Named `#extra` slot. Use to add an icon or image preview, or any extra elements on the left-hand side of the option label.
          -->
          <slot name="extra">
            <a-color-circle v-if="optionColor" class="ml-2" :color="optionColor"></a-color-circle>
          </slot>
        </span>
        <!--
            @slot `#default` slot. Use to render custom styles or extra markup for the option. Renders option label by default.
          -->
        <slot :active="active" :selected="selected" :disabled="slotDisabled" :option="option">
          <span class="truncate">
            {{ optionLabel }}
          </span>
        </slot>
      </template>
    </div>
  </component>
</template>
