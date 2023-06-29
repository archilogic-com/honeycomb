<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ASpinner',

  props: {
    /**
     * spinner size: `sm`, `md`, `lg`
     */
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md'
    },
    /**
     * spinner color variant: `default` (warsaw), and `prominent` (mediumblue)
     */
    variant: {
      type: String as PropType<'prominent' | 'default'>,
      default: 'default'
    }
  },
  computed: {
    spinnerColorClass() {
      return this.variant === 'default' ? 'text-warsaw' : 'text-mediumblue'
    },
    spinnerSize() {
      const spinnerSizeMap = {
        sm: '16px',
        md: '32px',
        lg: '40px'
      }
      return spinnerSizeMap[this.size]
    }
  }
})
</script>
<template>
  <svg
    class="animate-spin"
    :class="spinnerColorClass"
    :width="spinnerSize"
    :height="spinnerSize"
    stroke="currentColor"
    viewBox="0 0 52 52">
    <circle
      class="animate-dash"
      cx="26px"
      cy="26px"
      r="20px"
      fill="none"
      stroke-linecap="round"
      stroke-width="5"></circle>
  </svg>
</template>
