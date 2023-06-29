<script lang="ts">
import { defineComponent } from 'vue'
import AIcon from '../Icon.vue'

export default defineComponent({
  name: 'FloatingArrow',
  components: { AIcon },
  props: {
    float: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<template>
  <div
    class="transition-all duration-300 ease-in-out"
    :class="[float ? 'group-focus-within:grow group-hover:grow' : 'grow-0']">
    <AIcon name="ChevronDown" size="other" class="ml-auto" />
  </div>
</template>
