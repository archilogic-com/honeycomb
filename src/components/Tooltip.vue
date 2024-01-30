<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useFloating, arrow, flip, autoUpdate, shift } from '@floating-ui/vue'

let id = 0

const createId = () => {
  return ++id
}

export default defineComponent({
  name: 'ATooltip',
  props: {
    /** determines how tooltip will be associated with the control that triggered it,
     * i.e. with `aria-describedby` or `aria-labelledby` attribute.
     */
    role: {
      type: String as PropType<'label' | 'description'>,
      default: 'label'
    },
    /** The text content of the tooltip.
     * Tooltips can span multiple lines, but try to keep it short.
     */
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const reference = ref(null)
    const floating = ref(null)
    const floatingArrow = ref(null)
    const { floatingStyles, middlewareData, placement } = useFloating(reference, floating, {
      placement: 'top',
      whileElementsMounted: autoUpdate,
      middleware: [
        flip({ fallbackAxisSideDirection: 'start' }),
        shift(),
        arrow({ element: floatingArrow })
      ]
    })

    const isVisible = ref(false)

    const showTooltip = () => {
      isVisible.value = true
    }

    const hideTooltip = () => {
      isVisible.value = false
    }

    const tooltipId = `a-tooltip-${createId()}`

    const ariaSlotProps = {
      [props.role === 'label' ? 'aria-labelledby' : 'aria-describedby']: tooltipId
    }

    // arrow positioning https://floating-ui.com/docs/arrow#visualization
    // followed instructions here https://codesandbox.io/p/sandbox/mystifying-kare-ee3hmh?file=%2Fsrc%2Findex.js
    const side = computed(() => placement.value.split('-')[0])

    const staticSide = computed(
      () =>
        ({
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        })[side.value]
    )

    const arrowStyle = computed(() => ({
      left: middlewareData.value.arrow?.x != null ? `${middlewareData.value.arrow.x}px` : '',
      top: middlewareData.value.arrow?.y != null ? `${middlewareData.value.arrow.y}px` : '',
      [staticSide.value as string]: '4.5px'
    }))

    return {
      reference,
      floating,
      floatingArrow,
      floatingStyles,
      middlewareData,
      isVisible,
      showTooltip,
      hideTooltip,
      tooltipId,
      ariaSlotProps,
      arrowStyle
    }
  }
})
</script>
<template>
  <div
    ref="reference"
    class="w-fit h-fit"
    @focusin="showTooltip"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusout="hideTooltip"
    @keydown.esc="hideTooltip">
    <!-- @slot the control that triggers the tooltip goes into the default slot. 
    -->
    <slot v-bind="ariaSlotProps" />
    <!-- role="tooltip" is mostly for testing purposes, to select tooltip by role. 
        Even though it is a part of html spec, it does not do anything. -->
    <div
      :id="tooltipId"
      ref="floating"
      role="tooltip"
      :style="floatingStyles"
      class="absolute top-0 left-0 max-w-[180px] w-max z-10"
      :class="isVisible ? 'visible' : 'invisible'">
      <div
        ref="floatingArrow"
        class="absolute w-2 h-2 bg-white rotate-45"
        :style="arrowStyle"></div>
      <div
        class="flex items-center justify-center body-sm text-stone rounded shadow-sm bg-white py-1 px-2 m-2 gap-1">
        <span v-if="content" class="py-[2px]">{{ content }}</span>
      </div>
    </div>
  </div>
</template>
