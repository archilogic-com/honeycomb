<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { type Color, colorMap } from '../colors'

export default defineComponent({
  name: 'AColorCircle',
  props: {
    /**
     * fill color of the circle
     */
    color: {
      type: String as PropType<Color>,
      default: ''
    },
    borderColor: {
      type: String as PropType<Color>,
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
      props.color ? `${colorMap[props.color] || props.color}` : ''
    )
    const borderColor = computed(() => props.borderColor || backgroundColor.value)
    const styles = computed(() => ({
      backgroundColor: backgroundColor.value,
      border: `1px solid ${borderColor.value}`
    }))
    return {
      colorMap,
      styles
    }
  }
})
</script>
<template>
  <span
    class="inline-block shrink-0 rounded-full"
    :class="size === 'md' ? 'h-2 w-2' : 'h-3 w-3'"
    :style="styles"></span>
</template>
