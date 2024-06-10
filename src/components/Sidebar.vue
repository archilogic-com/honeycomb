<script lang="ts">
import { defineComponent, onBeforeUnmount, PropType, ref, Ref } from 'vue'

export const sidebarResizingClass = 'a-sidebar--resizing'

export default defineComponent({
  name: 'ASidebar',
  props: {
    /**
     * position of the sidebar
     */
    side: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    /**
     * HTML element the component should render as
     */
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: 'aside'
    },
    /**
     * if the sidebar should be resizable
     */
    resizable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const sidebar: Ref<HTMLElement | null> = ref(null)
    const isResizing = ref(false)

    function resize(event: MouseEvent) {
      event.preventDefault() // prevent text selection
      isResizing.value = true
      document.body.style.cursor = 'col-resize'
      if (sidebar.value) {
        let newWidth: number
        if (props.side === 'left') {
          newWidth = event.clientX - sidebar.value.getBoundingClientRect().left
        } else {
          newWidth = sidebar.value.getBoundingClientRect().right - event.clientX
        }
        sidebar.value.style.width = `${newWidth}px`
      }
    }

    function stopResize() {
      isResizing.value = false
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', resize, false)
    }

    function initResize() {
      document.addEventListener('mousemove', resize, false)
      document.addEventListener('mouseup', stopResize, false)
    }

    onBeforeUnmount(() => {
      stopResize()
    })

    return { initResize, sidebar, isResizing }
  },
  computed: {
    borderClass() {
      return this.side === 'left' ? 'border-r' : 'border-l'
    },
    resizableClass() {
      return this.side === 'left' ? '-right-1' : '-left-1'
    },
    isResizingClass() {
      return this.isResizing ? sidebarResizingClass : ''
    }
  }
})
</script>
<template>
  <component
    :is="as"
    ref="sidebar"
    class="relative min-h-full flex-shrink-0 border-gray bg-white"
    :class="[borderClass, isResizingClass]">
    <div class="flex h-full flex-col items-stretch justify-start">
      <!--
          @slot Use the slot to add children to the sidebar.
      The slot is empty by default.
      -->
      <slot />
    </div>
    <div
      v-if="resizable"
      role="separator"
      aria-orientation="vertical"
      class="absolute top-0 min-h-full w-2 flex-shrink-0 hover:cursor-col-resize"
      :class="resizableClass"
      @mousedown="initResize"></div>
  </component>
</template>
