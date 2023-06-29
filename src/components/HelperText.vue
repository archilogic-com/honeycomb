<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'AHelperText',
  components: { AIcon },
  props: {
    /**
     * content of the helper text
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * visual presentation variant
     *
     * 'hint' or 'error'
     */
    variant: {
      type: String as PropType<'hint' | 'error'>,
      default: 'hint'
    }
  },
  computed: {
    colorClass() {
      return this.variant === 'hint' ? 'text-stone' : 'text-error'
    }
  }
})
</script>
<template>
  <span class="flex py-1 body-xs" :class="colorClass">
    <AIcon v-if="variant === 'error'" class="mr-1" name="Warning" size="sm"></AIcon>
    <slot>{{ content }}</slot>
  </span>
</template>
