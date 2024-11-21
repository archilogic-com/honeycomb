<!-- eslint-disable no-redeclare -->
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { SelectItemCallback } from '../composables/multiSelect'

export default defineComponent({
  name: 'ATableRow',
  props: {
    /**
     * optional
     *
     * if `true`, adds a background highlight color
     */
    selected: {
      type: Boolean,
      default: false
    },
    /**
     * optional
     *
     * if provided along with `selectRowCallback`, opts into `a-table`'s selection functionality
     */
    selectId: {
      type: String,
      default: undefined
    },
    /**
     * optional
     *
     * use the `selectRow` method exposed on `a-table`'s default slot
     *
     * if provided along with `selectId`, opts into `a-table`'s selection functionality
     *
     */
    selectRowCallback: {
      type: Function as PropType<SelectItemCallback>,
      default: undefined
    }
  },
  setup(props, { expose }) {
    const expanded = ref(false)
    const trRef = ref(null)
    function toggleRow(event: MouseEvent): void
    function toggleRow(expand: boolean): void
    function toggleRow(arg: MouseEvent | boolean): void {
      if (typeof arg === 'boolean') {
        expanded.value = arg
      } else {
        expanded.value = !expanded.value
      }
    }

    const selectRow = (event: MouseEvent | KeyboardEvent) => {
      if (props.selectId && props.selectRowCallback) {
        props.selectRowCallback(props.selectId, event)
      }
    }

    expose({
      trRef,
      toggleRow
    })

    return {
      expanded,
      toggleRow,
      selectRow,
      trRef
    }
  }
})
</script>
<template>
  <tr
    ref="trRef"
    class="cursor-pointer scroll-mt-12 hover:bg-athens focus-visible:focus-outline active:bg-zurich48"
    :class="{ 'bg-zurich48 hover:bg-zurich': selected }"
    v-bind="$attrs"
    tabindex="-1"
    @click="selectRow"
    @keypress.space.self.prevent="selectRow"
    @mousedown.shift.prevent>
    <!--
        @slot Required `#default` slot. Accepts `a-table-cell` elements.
        
        Default value: empty
      -->
    <slot :expanded="expanded" :toggle-row="toggleRow"></slot>
  </tr>
  <template v-if="expanded">
    <!--
        @slot Optional named `#nested` slot for nested row content. Accepts `a-table-row` elements.
        
        Default value: empty
      -->
    <slot name="nested" :expanded="expanded" :toggle-row="toggleRow"></slot>
  </template>
</template>
