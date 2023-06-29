<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ATabButton',
  props: {
    /**
     * plain-text title
     *
     * for markup use the title slot instead
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * whether the tab is currently selected/active
     */
    selected: {
      type: Boolean,
      required: true
    }
  }
})
</script>
<template>
  <button
    :class="
      selected
        ? 'border-b-2 border-mediumblue text-mediumblue body-md-600'
        : 'text-stone body-md-500'
    "
    class="h-8 px-2 transition duration-300 ease-in-out hover:text-mediumblue focus-visible:focus-outline">
    <!--
          @slot #default
          Use the slot to provide the tab title
        -->
    <slot>{{ title }}</slot>
  </button>
</template>
