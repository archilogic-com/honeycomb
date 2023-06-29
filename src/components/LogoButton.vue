<script lang="ts">
import { defineComponent } from 'vue'
import AButton from './Button.vue'
import ALogo from './Logo.vue'

export default defineComponent({
  name: 'ALogoButton',
  components: { AButton, ALogo },
  /**
   * an accessible text label for the logo button
   */
  props: {
    label: {
      type: String,
      default: 'Archilogic Home'
    }
  }
})
</script>
<template>
  <AButton class="py-[2px] active:bg-transparent" size="auto" variant="subtle" :aria-label="label">
    <ALogo />
  </AButton>
</template>
