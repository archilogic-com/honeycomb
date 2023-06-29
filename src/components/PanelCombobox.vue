<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'APanelCombobox'
})
</script>
<template>
  <div class="a-menu-panel overflow-y-auto overflow-x-hidden px-2">
    <!-- #default slot for the combobox component -->
    <slot panel-classes="-mx-2" :inline="true"></slot>
  </div>
</template>
