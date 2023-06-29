<script lang="ts">
import { defineComponent, PropType, onMounted, watch, ref } from 'vue'

import { AButton } from './index'

export default defineComponent({
  name: 'AToast',
  components: { AButton },
  props: {
    /**
     * visual presentation variant
     *
     * `default`, `warning`, or `error`
     */
    variant: {
      type: String as PropType<'default' | 'warning' | 'error'>,
      default: 'default'
    },
    /**
     * The period for which the toast should be visible in ms.
     * It will be closed automatically in 5 seconds by default.
     *
     * If timeout is set to 0, the toast will not auto-dismiss.
     */
    timeout: {
      type: Number,
      default: 5000
    },
    /**
     * whether the toast can be closed by the user.
     * renders a close button (default).
     */
    dismissible: {
      type: Boolean,
      default: true
    },
    /**
     * the visibility of the toast
     * set to false to trigger the toast's closing transition
     * when closing the toast programmatically
     */
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: ['dismiss'],
  setup(props, { emit }) {
    const isToastVisible = ref(true)
    let timeout: ReturnType<typeof setTimeout>

    const scheduleDismissToast = () => {
      // if timeout is set to 0, the toast will not auto-dismiss
      if (props.timeout === 0) {
        return
      }
      timeout = setTimeout(() => dismissToast(), props.timeout)
    }
    const dismissToast = () => {
      isToastVisible.value = false
      clearTimeout(timeout)
      setTimeout(() => {
        emit('dismiss')
      }, 300) // transition duration
    }
    onMounted(() => scheduleDismissToast())

    watch(
      () => props.open,
      () => {
        if (!props.open) {
          dismissToast()
        }
      }
    )

    return { dismissToast, isToastVisible }
  }
})
</script>
<template>
  <div
    :class="[
      {
        'bg-newyork text-white': variant === 'default',
        'bg-warning text-newyork': variant === 'warning',
        'bg-error text-white': variant === 'error'
      },
      isToastVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    ]"
    class="max-w-max items-center rounded px-4 py-2 transition duration-300 ease-in-out body-lg md:flex">
    <!--
      @slot #default
      Use the slot to provide text and button
    -->
    <slot></slot>
    <AButton
      v-if="dismissible"
      variant="subtle"
      label="Dismiss"
      icon="Close"
      class="md:ml-6"
      :class="{
        'text-warsaw': variant === 'default',
        'text-navy': variant === 'warning',
        'text-white': variant === 'error'
      }"
      @click="dismissToast"></AButton>
  </div>
</template>
