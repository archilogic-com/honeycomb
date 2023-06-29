<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'ADisclosure',
  components: { AIcon },
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
     * whether the component is expanded by default
     *
     * default is collapsed (open=false)
     */
    open: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isOpen = ref(false)

    watch(
      () => props.open,
      open => {
        isOpen.value = open
      },
      { immediate: true }
    )

    return {
      isOpen
    }
  }
})
</script>

<template>
  <details
    :open="isOpen"
    @toggle="(event: Event) => (isOpen = (event.target as HTMLDetailsElement).open)">
    <summary
      class="flex w-full cursor-pointer items-center gap-2 text-stone body-md-600 hover:text-newyork focus-visible:focus-shadow">
      <span class="flex-1 truncate text-left">
        <slot name="title">{{ title }}</slot>
      </span>
      <AIcon :name="isOpen ? 'Hide' : 'Expand'" size="md" />
    </summary>
    <slot name="default" />
  </details>
</template>

<style scoped>
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
</style>
