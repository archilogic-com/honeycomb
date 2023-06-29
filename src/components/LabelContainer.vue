<script lang="ts">
import { defineComponent, PropType, Component } from 'vue'

export default defineComponent({
  name: 'ALabelContainer',
  props: {
    /**
     * HTML element or Vue component the component should render as
     */
    as: {
      type: [String, Object] as PropType<keyof HTMLElementTagNameMap | Component>,
      default: 'div'
    },
    /**
     * a text label or name for inputs or other values
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * the value to be displayed
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * label and value size
     */
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>,
      default: 'xs'
    },
    /**
     * component alignment, vertical or horizontal
     */
    align: {
      type: String as PropType<'row' | 'col'>,
      default: 'col'
    },
    /** extra classes for the container component of the `#label` slot
     * (direct child of a-label-container)
     * e.g. useful for setting relative width in row alignment
     */
    labelClasses: {
      type: String,
      default: ''
    },
    /** extra classes for the container component of the `#value` slot
     * (direct child of a-label-container)
     * e.g. useful for setting relative width in row alignment
     */
    valueClasses: {
      type: String,
      default: ''
    }
  }
})
</script>
<template>
  <component
    :is="as"
    class="flex"
    :class="{ 'flex-col ': align === 'col', 'gap-1': align === 'row' }">
    <div
      class="flex shrink-0 text-navy"
      :class="[
        {
          'py-2': align === 'row',
          'body-xs': size === 'xs',
          'body-sm': size === 'sm',
          'body-md': size === 'md' || size === 'lg'
        },
        labelClasses
      ]">
      <slot name="label">{{ label }}</slot>
    </div>
    <div
      class="flex text-newyork"
      :class="[
        {
          'min-h-8 body-sm': size === 'xs' || size === 'sm',
          'min-h-10 body-md': size === 'md',
          'min-h-10  body-lg': size === 'lg'
        },
        valueClasses
      ]">
      <slot>
        <span class="py-2">{{ value }}</span>
      </slot>
    </div>
  </component>
</template>
