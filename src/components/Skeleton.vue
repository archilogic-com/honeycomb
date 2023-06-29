<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ASkeleton',

  props: {
    /**
     * skeleton variant: `line` (default), or `block`
     */
    variant: {
      type: String as PropType<'line' | 'block'>,
      default: 'line'
    }
  }
})
</script>
<template>
  <div class="inline-flex min-h-4 min-w-4 items-center">
    <span
      class="relative w-full overflow-hidden rounded-sm bg-athens after:absolute after:inset-0 after:-translate-x-full after:transform after:animate-shimmer after:bg-gradient-to-r after:from-athens after:via-whisper after:to-athens"
      :class="{ 'h-full': variant === 'block', 'h-2 py-1': variant === 'line' }"></span>
  </div>
</template>
