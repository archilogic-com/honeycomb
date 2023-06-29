<script lang="ts">
import { defineComponent, PropType, ref, computed, nextTick, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { focusable } from 'tabbable'

type Align = 'right' | 'left'
type Direction = 'up' | 'down'

let id = 0

const createId = () => {
  return ++id
}

export default defineComponent({
  name: 'APopup',
  props: {
    /**
     * Whether the popup should be open at render.
     */
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Horizontal alignment of the popup panel in relation to the popup button.
     * Left means the left edge of the dropdown is aligned with the left edge of the popup trigger button.
     * Right means the right edge of the dropdown is aligned with the right edge of the popup trigger button.
     *
     */
    align: {
      type: String as PropType<Align>,
      default: 'left'
    },
    /* Vertical alignment of the popup panel in relation to the popup button.
     * Possible values: `up`, `down`.
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'down'
    },
    /**
     * Extra classes to style the popup panel.
     * Useful for setting the panel dimension, e.g. max height.
     */
    panelClasses: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isOpenState = ref(false)
    const container = ref()
    const popupPanel = ref()
    const popupButton = computed(() => container.value?.querySelector('button[aria-haspopup]'))
    const popupId = `a-popup-${createId()}`
    onMounted(async () => {
      if (props.open) {
        await openPopup()
      }
    })

    onClickOutside(container, () => {
      if (isOpenState.value) {
        isOpenState.value = false
      }
    })

    const positionPopup = () => {
      if (popupPanel.value) {
        const popupRect = popupPanel.value.getBoundingClientRect()
        const popupToBottomDistance = window.innerHeight - popupRect.bottom
        if (props.direction === 'down' && popupToBottomDistance <= 0) {
          popupPanel.value.style.top = `calc(100% + ${popupToBottomDistance}px)`
        } else if (props.direction === 'up' && popupRect.top < 0) {
          popupPanel.value.style.bottom = `calc(100% + ${popupRect.top}px`
        }
      }
    }

    const openPopup = async () => {
      isOpenState.value = true
      await nextTick() // wait for the DOM to update
      positionPopup()
    }

    const closePopup = () => {
      isOpenState.value = false
      if (popupButton.value) {
        popupButton.value.focus()
      }
    }

    const togglePopup = async () => {
      if (isOpenState.value) {
        closePopup()
      } else if (!popupButton.value?.disabled) {
        await openPopup()
        const focusableElements = focusable(popupPanel.value)
        if (focusableElements.length) {
          focusableElements[0].focus()
        }
      }
    }

    const closeOnTabOut = (event: FocusEvent) => {
      if (event.relatedTarget && !container.value?.contains(event.relatedTarget)) {
        isOpenState.value = false
      }
    }

    return {
      isOpenState,
      togglePopup,
      popupPanel,
      popupButton,
      container,
      closeOnTabOut,
      closePopup,
      popupId
    }
  }
})
</script>
<template>
  <div ref="container" class="relative h-min" @keydown.esc="closePopup" @focusout="closeOnTabOut">
    <div
      @keydown.enter.prevent="togglePopup"
      @keydown.space.prevent="togglePopup"
      @click="togglePopup">
      <slot
        name="button"
        :open="isOpenState"
        :aria="{ controls: popupId }"
        :close="closePopup"></slot>
    </div>
    <div
      v-if="isOpenState && !popupButton?.disabled"
      :id="popupId"
      ref="popupPanel"
      class="absolute z-10 my-1"
      :class="[
        {
          'right-0': align === 'right',
          'left-0': align === 'left',
          'bottom-full': direction === 'up'
        },
        panelClasses
      ]">
      <slot :close="closePopup"></slot>
    </div>
  </div>
</template>
