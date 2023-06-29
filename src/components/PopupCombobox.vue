<script lang="ts">
import { defineComponent } from 'vue'

import APopup from './Popup.vue'
import APanelCombobox from './PanelCombobox.vue'

export default defineComponent({
  name: 'APopupCombobox',
  components: { APopup, APanelCombobox }
})
</script>
<template>
  <APopup>
    <template #button="slotProps">
      <slot name="button" v-bind="slotProps"></slot>
    </template>
    <template #default="{ close }">
      <APanelCombobox v-slot="slotProps">
        <slot :combobox-props="slotProps" :close="close"></slot>
      </APanelCombobox>
    </template>
  </APopup>
</template>
