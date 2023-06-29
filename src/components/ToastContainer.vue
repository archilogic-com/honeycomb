<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AToastContainer'
})
</script>
<template>
  <div class="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 gap-2 body-lg">
    <!--
      @slot #default
      Use the slot to provide AToast components
    -->
    <slot></slot>
  </div>
</template>
