<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ArrowKeyFocusable from './ArrowKeyFocusable.vue'

export default defineComponent({
  name: 'ATable',
  components: { ArrowKeyFocusable },

  props: {
    /**
     * optional
     *
     * typography size of the table body
     *
     * `sm` | `md`
     */
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md'
    },
    /**
     * * optional
     *
     * background color of the table
     *
     * `white` | `whisper`
     */
    background: {
      type: String as PropType<'white' | 'whisper'>,
      default: 'white'
    }
  },
  computed: {
    tableBodyClass() {
      return this.size === 'sm' ? 'body-sm' : 'body-md'
    },
    tableBackgroundClass() {
      return this.background === 'white' ? 'bg-white' : 'bg-whisper'
    }
  }
})
</script>
<template>
  <div>
    <table
      class="w-full table-fixed border-separate text-left border-spacing-0"
      :class="tableBackgroundClass">
      <colgroup>
        <!--
          @slot Named `#colgroup` slot. Takes [colgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup) element.
          Use this slot to adjust column sizing.

          Default value: empty
        -->
        <slot name="colgroup"></slot>
      </colgroup>
      <thead>
        <tr class="sticky top-0 z-10 border-b border-gray text-stone" :class="tableBackgroundClass">
          <!--
            @slot Named `#header` slot. Takes `a-table-header` elements.
            Use this slot to render table header.
            
            Default value: empty
          -->
          <slot name="header"></slot>
        </tr>
      </thead>
      <arrow-key-focusable :class="tableBodyClass" class="text-navy" as="tbody">
        <slot></slot>
      </arrow-key-focusable>
    </table>
  </div>
</template>
