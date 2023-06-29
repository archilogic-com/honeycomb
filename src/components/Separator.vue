<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ASeparator',
  props: {
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: undefined
    },
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  computed: {
    element() {
      if (this.as) {
        return this.as
      } else if (this.orientation === 'vertical') {
        return 'div'
      } else {
        return 'hr'
      }
    }
  }
})
</script>

<template>
  <component
    :is="element"
    role="separator"
    :aria-orientation="orientation"
    class="flex shrink-0 self-stretch border-0 bg-gray p-0"
    :class="orientation === 'horizontal' ? 'h-px' : 'w-px '" />
</template>
