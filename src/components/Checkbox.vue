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
      class="custom-checkbox shrink-0" />
    <span
      aria-hidden="true"
      class="custom-mark pointer-events-none absolute hidden p-[3px] text-white">
      <AIcon :name="mixed ? 'CheckboxIndeterminate' : 'CheckboxCheck'" size="other"></AIcon>
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
<style scoped>
.custom-checkbox {
  @apply m-px inline-block h-[14px] w-[14px] cursor-pointer appearance-none rounded border border-stone bg-white transition-colors duration-300 ease-in-out;
}
.custom-checkbox:checked,
.custom-checkbox:indeterminate {
  @apply border-mediumblue bg-mediumblue;
}

.custom-checkbox:hover {
  @apply bg-stone16;
}

.custom-checkbox:checked:hover:not(:disabled),
.custom-checkbox:indeterminate:hover:not(:disabled) {
  @apply border-blueribbon bg-blueribbon;
}

.custom-checkbox:disabled {
  @apply cursor-not-allowed border-stone16 bg-stone8;
}

.custom-checkbox:checked:disabled,
.custom-checkbox:indeterminate:disabled {
  @apply border-transparent;
}

.custom-checkbox:checked + .custom-mark,
.custom-checkbox:indeterminate + .custom-mark {
  @apply inline;
}
.custom-checkbox:disabled + .custom-mark {
  @apply text-warsaw;
}

.custom-checkbox:focus-visible {
  @apply shadow-none focus-border;
}
</style>
