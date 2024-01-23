<script lang="ts">
import { defineComponent } from 'vue'
import AButton from './Button.vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'AAppMenuMultiButton',
  components: { AButton, AIcon },
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      required: true
    },
    pressed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
  <div class="group relative">
    <AButton
      :aria-pressed="pressed"
      :pressed="open || pressed"
      :disabled="disabled"
      :class="{ 'group-hover:bg-gray group-hover:text-navy': !disabled }"
      v-bind="$attrs"
      @click.stop
      @keydown.enter.stop
      @keydown.space.stop>
      <slot />
    </AButton>
    <button
      aria-haspopup="true"
      :aria-expanded="open"
      aria-label="Toggle menu"
      :disabled="disabled"
      :aria-controls="controls"
      class="absolute bottom-0 right-0 top-0 flex items-center rounded focus-visible:focus-shadow hover:enabled:pt-[2px] hover:enabled:text-navy disabled:cursor-not-allowed disabled:opacity-40 group-hover:text-navy"
      :class="{
        'text-mediumblue': open || pressed,
        'left-0 justify-end pt-[2px]': open
      }">
      <AIcon name="ChevronDown" size="other" class="mx-[2px]" />
    </button>
  </div>
</template>
