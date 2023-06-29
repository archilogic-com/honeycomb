<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ASeparator from './Separator.vue'
import { Option } from './Option.vue'
import AOption from './Option.vue'

export type OptionGroup = {
  title?: string
  options: Option[]
}

export const areOptionsGrouped = (options: Option[] | OptionGroup[]): options is OptionGroup[] => {
  return !!options.length && 'options' in options[0]
}

export default defineComponent({
  name: 'AOptionGroup',
  components: { ASeparator, AOption },
  props: {
    /**
     * the option group title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * list of options to render
     */
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    /**
     * parent component, listbox or combobox
     */
    component: {
      type: String as PropType<'listbox' | 'combobox'>,
      default: 'listbox'
    },
    /**
     * whether the option is rendered in multiselect combobox (with a checkbox)
     */
    multi: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    titleId() {
      return this.title ? `${this.title}-option-group` : undefined
    }
  }
})
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
        :key="option.value"
        :component="component"
        :multi="multi"
        :option="option"></AOption>
    </slot>
  </div>
  <a-separator class="my-2 last-of-type:hidden" />
</template>
