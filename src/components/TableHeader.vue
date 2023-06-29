<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AIcon from './Icon.vue'

export default defineComponent({
  name: 'ATableHeader',
  components: { AIcon },
  props: {
    /**
     * optional
     *
     * header text, rendered in the default slot
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
     * sorting indicator
     *
     * if provided, an arrow icon is rendered next to header text
     *
     * `asc`| `desc` | `undefined`
     */
    sortedBy: {
      type: String as PropType<'asc' | 'desc' | ''>,
      default: ''
    },
    /**
     * optional
     *
     * whether the table can be sorted by this column
     * default 'true'
     */
    sortable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ariaSort(): 'ascending' | 'descending' | undefined {
      return this.sortedBy ? `${this.sortedBy}ending` : undefined
    }
  }
})
</script>
<template>
  <th class="border-b border-gray py-1 pl-2" :aria-sort="ariaSort">
    <template v-if="!$slots.component">
      <button
        v-if="sortable"
        class="flex h-8 max-h-10 w-full cursor-pointer rounded-sm py-2 pl-4 text-left transition duration-200 ease-in-out body-sm-600 hover:text-newyork focus-visible:focus-shadow">
        <a-icon
          v-if="sortedBy"
          size="sm"
          :name="sortedBy === 'asc' ? 'ArrowUp' : 'ArrowDown'"
          class="-ml-4"></a-icon>
        <span class="truncate">
          <!--
            @slot __Note__: Slot content takes precedence over the `text` prop.
            Default value: 
            
            the value of `text` prop    
          -->
          <slot>{{ text }}</slot>
        </span>
      </button>
      <div v-else class="w-full truncate pl-4 text-left body-sm-600">
        <!--
            @slot __Note__: Slot content takes precedence over the `text` prop.
            Default value: 
            
            the value of `text` prop    
          -->
        <slot>{{ text }}</slot>
      </div>
    </template>
    <!--
      @slot Named `#component` slot.
      Use to render an interactive component inside the table header cell
      instead of a typical column header, e.g. a select all checkbox or a menu button.
      -->
    <slot name="component"></slot>
  </th>
</template>
