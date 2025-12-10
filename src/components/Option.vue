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
    option: T
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

const optionColor = computed(() => {
  const opt = props.option as BaseOption & { color?: Color }
  return opt.color
})
</script>
<template>
  <component
    :is="componentOption"
    v-slot="{ active, selected, disabled }"
    as="template"
    :value="option.value"
    :disabled="option.disabled">
    <div
      class="flex min-h-8 min-w-8 items-center px-2 cursor-pointer"
      :class="{
        'bg-athens': active,
        'bg-zurich48 text-mediumblue': selected && !multi,
        'text-newyork': !selected && !disabled,
        'cursor-not-allowed text-warsaw': disabled
      }">
      <a-checkbox v-if="multi" readonly :model-value="selected" :disabled="disabled">
        <!--
             @slot Named `#extra` slot. Use to add an icon or image preview, or any extra elements on the left-hand side of the option label.
          -->
        <slot name="extra">
          <a-color-circle v-if="optionColor" class="mr-2" :color="optionColor"></a-color-circle>
        </slot>
        <!--
            @slot `#default` slot. Use to render custom styles or extra markup for the option. Renders option label by default.
          -->
        <slot :active="active" :selected="selected" :disabled="disabled" :option="option">
          <span class="truncate" :class="disabled && 'text-warsaw'">
            {{ option.label }}
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
        <slot :active="active" :selected="selected" :disabled="disabled" :option="option">
          <span class="truncate">
            {{ option.label }}
          </span>
        </slot>
      </template>
    </div>
  </component>
</template>
