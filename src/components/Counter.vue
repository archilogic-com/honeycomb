<script lang="ts">
import { defineComponent, PropType } from 'vue'

type CounterVariant = 'default' | 'primary' | 'highlight' | 'subtle'

export default defineComponent({
  name: 'ACounter',
  props: {
    /**
     * content of the counter
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * visual presentation variant
     *
     * `default`, 'primary', `highlight` or `subtle`
     */
    variant: {
      type: String as PropType<CounterVariant>,
      default: 'default'
    }
  },
  computed: {
    counterClassNames() {
      const counterClasses = []
      // add variant classes:
      if (this.variant === 'default') {
        counterClasses.push('bg-athens text-navy')
      }
      if (this.variant === 'primary') {
        counterClasses.push('bg-zurich text-mediumblue')
      }
      if (this.variant === 'highlight') {
        counterClasses.push('bg-white text-navy')
      }
      return counterClasses
    }
  }
})
</script>
<template>
  <span class="rounded-full px-2 py-1 body-sm" :class="counterClassNames">
    <slot>{{ content }}</slot>
  </span>
</template>
