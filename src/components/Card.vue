<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ACard',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const tagName = computed(() => {
      if (attrs.href) {
        return 'a'
      } else if (attrs.onClick) {
        return 'button'
      } else {
        return 'div'
      }
    })
    return { tagName }
  }
})
</script>
<template>
  <component
    :is="tagName"
    class="group relative inline-flex rounded bg-whisper shadow-border shadow-gray focus-visible:focus-none"
    :class="{
      'hover:cursor-pointer hover:bg-athens active:bg-zurich active:text-mediumblue':
        tagName !== 'div',
      'bg-zurich [&:not(:hover)]:text-mediumblue': active
    }">
    <div
      class="absolute inset-0 rounded shadow-border shadow-gray"
      :class="{
        'hover:shadow-warsaw group-focus-visible:focus-shadow': tagName !== 'div',
        '[&:not(:hover)]:focus-shadow': active
      }"></div>
    <slot></slot>
  </component>
</template>
