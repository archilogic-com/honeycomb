<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AAppMenuGroupTitle',
  props: {
    /**
     * menu item group title
     */
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<template>
  <li role="presentation" class="flex h-8 w-full items-center px-4 py-2 text-stone body-xs-600">
    <slot>{{ title }}</slot>
  </li>
</template>
