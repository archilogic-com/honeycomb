<script lang="ts">
export type { OptionGroup } from '../types/selection'
export { areOptionsGrouped } from '../types/selection'
</script>

<script setup lang="ts" generic="T extends BaseOption = ExtendedOption">
import { computed } from 'vue'
import ASeparator from './Separator.vue'
import AOption from './Option.vue'
import { type BaseOption, type ExtendedOption } from '../types/selection'

const props = withDefaults(
  defineProps<{
    /**
     * the option group title
     */
    title?: string
    /**
     * list of options to render
     */
    options?: T[]
    /**
     * parent component, listbox or combobox
     */
    component?: 'listbox' | 'combobox'
    /**
     * whether the option is rendered in multiselect combobox (with a checkbox)
     */
    multi?: boolean
  }>(),
  {
    title: '',
    options: () => [],
    component: 'listbox',
    multi: false
  }
)

const titleId = computed(() => (props.title ? `${props.title}-option-group` : undefined))
</script>

<template>
  <div role="group" :aria-labelledby="titleId">
    <div
      v-if="title"
      :id="titleId"
      role="presentation"
      class="px-4 py-2 capitalize text-warsaw body-xs-600">
      <!--
           @slot Named `#group-title` slot. Use to render custom styles or extra markup as the option group title. Renders title prop by default.
        -->
      <slot name="group-title">{{ title }}</slot>
    </div>
    <!--
        @slot  `#default` slot. Takes `a-option` components without any wrappers.
        Use this slot to render listbox or combobox options with extra styles or markup.

        Default value: `options` prop rendered as `a-option`s
      -->
    <slot>
      <AOption
        v-for="option in options"
        :key="String(option.value)"
        :component="component"
        :multi="multi"
        :option="option"></AOption>
    </slot>
  </div>
  <a-separator class="my-2 last-of-type:hidden" />
</template>
