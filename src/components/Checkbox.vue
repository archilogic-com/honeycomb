<script lang="ts">
import { defineComponent } from 'vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'ACheckbox',
  components: { AIcon },
  inheritAttrs: false,
  props: {
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component
     */
    modelValue: {
      type: [Boolean, Array],
      required: true
    },
    /**
     * [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes) state for checkbox,
     * e.g. a select/deselect all checkbox in a table
     */
    mixed: {
      type: Boolean,
      default: false
    },
    /**
     * label text for the checkbox.
     * You can use the default slot as an alternative, esp. for complex labels with markup.
     * If a visible label is undesirable, provide an `aria-label` attribute for the component,
     * or add a `sr-only` class to a text label inside the default slot.
     */
    label: {
      type: String,
      default: ''
    },
    /** whether the label should be accessible to screen readers only
     * (visually hidden)
     */
    hideLabel: {
      type: Boolean,
      default: false
    },
    /**
     *  whether the checkbox is focusable and receiving pointer events
     *  to update its own state
     */
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const { style, class: className, ...attrs } = context.attrs
    return { style, className, attrs }
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(value: boolean | []) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>
<template>
  <label
    class="relative flex min-h-8 min-w-8 cursor-pointer p-2"
    :class="[{ 'pointer-events-none': readonly }, className]"
    :style="style as string">
    <input
      v-model="model"
      type="checkbox"
      v-bind="attrs"
      :tabindex="readonly ? '-1' : '0'"
      :indeterminate="mixed"
      class="a-checkbox-input peer shrink-0" />
    <span
      aria-hidden="true"
      class="a-checkbox-mark pointer-events-none absolute hidden p-[3px] text-white peer-checked:inline peer-indeterminate:inline peer-disabled:text-warsaw">
      <AIcon :icon="mixed ? 'checkbox-indeterminate-other' : 'checkbox-check-other'"></AIcon>
    </span>
    <!--
      @slot Use the default slot to add a label to the checkbox. 
		-->
    <span
      class="flex items-center self-center overflow-hidden text-navy body-sm"
      :class="hideLabel ? 'sr-only' : 'ml-2'">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
