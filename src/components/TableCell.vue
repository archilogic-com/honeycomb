<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'ATableCell',
  components: {
    AIcon
  },

  props: {
    /**
     * optional
     * table cell text, rendered in the default slot
     *
     * slot content takes precedence over this prop
     */
    text: {
      type: String,
      default: ''
    },
    /**
     * optional
     *
     * the state of nested row content: expanded or collapsed
     *
     * use the property exposed on `a-table-row` slots
     */
    expanded: {
      type: Boolean,
      default: undefined
    },
    /**
     * optional
     *
     * callback triggered on expand/collapse button click
     *
     * use the method exposed on `a-table-row` slots
     */
    toggleCallback: {
      type: Function as PropType<() => void>,
      default: undefined
    },
    /**
     * optional
     *
     * truncate text content of the table cell
     *
     * set to 'false' if content of the cell is a component
     */
    truncate: {
      type: Boolean,
      default: true
    },
    /**
     * optional
     *
     * set slimmer padding on the table cell
     */
    padding: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md'
    }
  }
})
</script>
<template>
  <td class="h-12 max-h-12 border-b border-gray" :class="padding === 'md' ? 'pl-6' : 'px-1'">
    <div class="flex items-center justify-start">
      <template v-if="expanded !== undefined">
        <button
          title="Toggle Row"
          :aria-label="expanded ? 'collapse' : 'expand'"
          class="-ml-1 mr-1"
          @click="toggleCallback">
          <AIcon size="other" :name="expanded ? 'MenuChevronDown' : 'MenuChevronRight'"></AIcon>
        </button>
      </template>
      <!--
          @slot __Note__: Slot content takes precedence over the `text` prop.
          Default value: 
          
          the value of `text` prop    
        -->
      <div :class="{ truncate: truncate }">
        <slot>{{ text }}</slot>
      </div>
    </div>
  </td>
</template>
