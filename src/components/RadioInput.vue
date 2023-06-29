<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ARadioInput',
  inheritAttrs: false,
  props: {
    /**
     * the prop modelValue is required to use [v-model](https://vuejs.org/guide/components/events.html#usage-with-v-model) with a component
     */
    modelValue: {
      type: String,
      required: true
    },
    /**
     * label text for the radio.
     * You can use the default slot as an alternative, esp. for complex labels with markup.
     * If a visible label is undesirable, provide an `aria-label` attribute for the component,
     * or add a `sr-only` class to a text label inside the default slot.
     */
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const { style, class: classAttribute, ...attrs } = context.attrs

    const model = computed({
      get: () => {
        return props.modelValue
      },
      set: value => {
        context.emit('update:modelValue', value)
      }
    })

    return { style, classAttribute, attrs, model }
  }
})
</script>
<template>
  <label
    class="relative flex min-h-8 min-w-8 cursor-pointer"
    :class="classAttribute"
    :style="(style as string)">
    <input
      v-model="model"
      type="radio"
      v-bind="attrs"
      class="relative m-2 h-[14px] w-[14px] shrink-0 appearance-none rounded-full border border-stone bg-white before:invisible before:absolute before:inset-[3px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-navy before:checked:visible focus:focus-border focus:before:inset-[2px] hover:enabled:bg-stone16 disabled:border-stone16 before:disabled:bg-warsaw" />
    <!--
      @slot Use the default slot to add a label to the radio. 
		-->
    <span class="flex items-center self-center overflow-hidden text-navy body-sm">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
