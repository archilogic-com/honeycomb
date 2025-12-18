<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type StatusVariant = 'primary' | 'success' | 'neutral' | 'danger'

export default defineComponent({
  name: 'AStatus',
  props: {
    /**
     * content of the status indicator
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * visual presentation variant
     *
     * 'success', 'primary', 'neutral' or 'danger'
     */
    variant: {
      type: String as PropType<StatusVariant>,
      default: 'neutral'
    }
  }
})
</script>
<template>
  <span
    class="rounded px-1 py-[2px] uppercase body-xs-600"
    :class="{
      'bg-zurich text-mediumblue': variant === 'primary',
      'bg-palered text-newyork': variant === 'danger',
      'bg-athens text-newyork': variant === 'neutral',
      'bg-palegreen text-newyork': variant === 'success'
    }">
    <slot>{{ content }}</slot>
  </span>
</template>
