<script lang="ts">
import { defineComponent, PropType, Component } from 'vue'
import AButton from './Button.vue'

export default defineComponent({
  name: 'APopupButton',
  components: { AButton },
  props: {
    /**
     * HTML element or Vue component to render as
     *
     * default is <a-button>
     */
    as: {
      type: [String, Object] as PropType<keyof HTMLElementTagNameMap | Component>,
      default: AButton
    },
    open: {
      type: Boolean,
      required: true
    },
    pressed: {
      type: Boolean,
      default: true
    },
    controls: {
      type: String,
      default: undefined
    }
  }
})
</script>

<template>
  <!-- default is <a-button> -->
  <component
    :is="as"
    aria-haspopup="true"
    :aria-expanded="open || undefined"
    :pressed="pressed && open"
    :aria-controls="controls">
    <slot />
  </component>
</template>
