<script lang="ts">
import { defineComponent } from 'vue'
import ASeparator from './Separator.vue'

export default defineComponent({
  name: 'AAppMenuSeparator',
  components: { ASeparator }
})
</script>

<template>
  <a-separator as="li" class="my-2" />
</template>
