<script lang="ts">
export { GROUP_VALUE_PREFIX } from '../types/selection'
</script>

<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { computed } from 'vue'
import { ComboboxOption } from '@headlessui/vue'
import ASeparator from './Separator.vue'
import AOption from './Option.vue'
import ACheckbox from './Checkbox.vue'
import { type BaseOption, type ExtendedOption, GROUP_VALUE_PREFIX } from '../types/selection'

const props = withDefaults(
  defineProps<{
    /**
     * the option group title
     */
    title: string
    /**
     * list of options in this group
     */
    options: T[]
    /**
     * current selection values (for computing checkbox state)
     */
    modelValue?: string[]
    /**
     * parent component type. Only 'combobox' is supported because this component
     * uses Headless UI's ComboboxOption for keyboard navigation.
     * This prop exists for API consistency with AOptionGroup.
     */
    component?: 'combobox'
  }>(),
  {
    modelValue: () => [],
    component: 'combobox'
  }
)

const titleId = computed(() => `${props.title}-option-group`)

// used by Headless UI for keyboard navigation AND click selection
const groupValue = computed(() => `${GROUP_VALUE_PREFIX}${props.title}`)

const enabledOptions = computed(() => props.options.filter(o => !o.disabled))

const selectedCount = computed(() => {
  const selectedSet = new Set(props.modelValue)
  return props.options.filter(o => selectedSet.has(String(o.value))).length
})

const areAllSelected = computed(
  () => selectedCount.value === enabledOptions.value.length && enabledOptions.value.length > 0
)

const isPartiallySelected = computed(
  () => selectedCount.value > 0 && selectedCount.value < enabledOptions.value.length
)
</script>

<template>
  <div role="group" :aria-labelledby="titleId" class="a-selectable-option-group">
    <!-- used to focus the group header via keyboard -->
    <ComboboxOption v-slot="{ active }" as="template" :value="groupValue">
      <div
        :id="titleId"
        class="a-selectable-option-group__header flex min-h-8 items-center capitalize text-warsaw body-xs-600 px-2 cursor-pointer"
        :class="{ 'bg-athens a-selectable-option-group__header--active': active }">
        <!--
            @slot Named `#group-title` slot. Use to render custom styles or extra markup as the option group title.
            Renders a checkbox with the title prop by default.
          -->
        <slot name="group-title">
          <ACheckbox readonly :model-value="areAllSelected" :mixed="isPartiallySelected">
            <span class="capitalize text-warsaw body-xs-600">{{ title }}</span>
          </ACheckbox>
        </slot>
      </div>
    </ComboboxOption>

    <div class="a-selectable-option-group__options [&_[role='option']]:pl-4">
      <!--
          @slot `#default` slot. Takes `a-option` components without any wrappers.
          Use this slot to render combobox options with extra styles or markup.

          Default value: `options` prop rendered as `a-option`s with `multi` enabled
        -->
      <slot>
        <AOption
          v-for="option in options"
          :key="String(option.value)"
          component="combobox"
          multi
          :option="option" />
      </slot>
    </div>
  </div>
  <a-separator class="my-2 last-of-type:hidden" />
</template>

<style>
.a-selectable-option-group__header:hover {
  @apply bg-athens;
}

/* when header is hovered or focused via keyboard, highlight child options */
.a-selectable-option-group:has(.a-selectable-option-group__header:hover)
  .a-selectable-option-group__options
  [role='option'],
.a-selectable-option-group:has(.a-selectable-option-group__header--active)
  .a-selectable-option-group__options
  [role='option'] {
  @apply bg-athens/50;
}
</style>
