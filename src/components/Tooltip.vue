<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useFloating, offset, flip, shift, autoPlacement } from '@floating-ui/vue'

let id = 0

const createId = () => {
  return ++id
}

export default defineComponent({
  name: 'ATooltip',
  props: {
    type: {
      type: String as PropType<'label' | 'description'>,
      default: 'label'
    },
    content: {
      type: String,
      default: ''
    },
    shortcut: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const reference = ref(null)
    const floating = ref(null)
    const { floatingStyles } = useFloating(reference, floating, {
      middleware: []
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
      [props.type === 'label' ? 'aria-labelledby' : 'aria-describedby']: tooltipId
    }

    return {
      reference,
      floating,
      floatingStyles,
      isVisible,
      showTooltip,
      hideTooltip,
      tooltipId,
      ariaSlotProps
    }
  }
})
</script>
<template>
  <div
    ref="reference"
    @focusin="showTooltip"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusout="hideTooltip">
    <slot v-bind="ariaSlotProps" />
    <div
      :id="tooltipId"
      ref="floating"
      :style="floatingStyles"
      class="absolute m-max top-0 left-0"
      :class="isVisible ? 'block' : 'hidden'">
      <div class="body-sm text-stone rounded shadow-sm bg-white p-2 m-2">
        <span v-if="content">{{ content }}</span>
        <span v-if="shortcut">{{ shortcut }}</span>
      </div>
    </div>
  </div>
</template>
