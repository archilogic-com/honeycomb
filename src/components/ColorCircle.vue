<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import colors from '../../tailwind/colorMap.json'

export type Colors = keyof typeof colors

export default defineComponent({
  name: 'AColorCircle',
  props: {
    /**
     * fill color of the circle
     */
    color: {
      type: String as PropType<Colors>,
      default: ''
    },
    /**
     * size of the circle
     * 'md' | 'lg'
     */
    size: {
      type: String as PropType<'md' | 'lg'>,
      default: 'md'
    }
  },
  setup(props) {
    const backgroundColor = computed(() =>
      props.color ? `background-color: ${colors[props.color] || props.color}` : ''
    )
    return {
      colors,
      backgroundColor
    }
  }
})
</script>
<template>
  <span
    class="inline-block shrink-0 rounded-full"
    :class="size === 'md' ? 'h-2 w-2' : 'h-3 w-3'"
    :style="backgroundColor"></span>
</template>
