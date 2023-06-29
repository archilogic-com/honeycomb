<script lang="ts">
import { defineComponent } from 'vue'

import AArrowKeyFocusable from './ArrowKeyFocusable.vue'
import APopup from './Popup.vue'

export default defineComponent({
  name: 'AAppMenu',
  components: { AArrowKeyFocusable, APopup }
})
</script>
<template>
  <APopup>
    <template #button="slotProps">
      <slot name="menu-button" v-bind="slotProps"></slot>
    </template>
    <template #default="{ close }">
      <AArrowKeyFocusable
        role="menu"
        as="ul"
        class="a-menu-panel overflow-y-auto overflow-x-hidden"
        @click="close"
        @keydown.space="close"
        @keydown.enter="close">
        <slot></slot>
      </AArrowKeyFocusable>
    </template>
  </APopup>
</template>
