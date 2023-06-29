<script lang="ts">
import { defineComponent, computed } from 'vue'
import ACheckbox from './Checkbox.vue'

export default defineComponent({
  name: 'ACheckboxSelectAll',
  components: { ACheckbox },
  props: {
    /*
     * the size (length) of selected items
     */
    selectedSize: {
      type: Number,
      required: true
    },
    /*
     * the size (length) of all items
     */
    itemsSize: {
      type: Number,
      required: true
    },
    /*
     * checkbox label (optional)
     */
    label: {
      type: String,
      default: 'Select All'
    }
  },
  emits: ['select', 'clear'],
  setup(props, { emit }) {
    const handleSelectAll = (newValue: boolean) => {
      if (newValue) {
        emit('select')
      } else {
        emit('clear')
      }
    }

    const selectedState = computed(() => {
      if (props.selectedSize === 0) {
        return 'none'
      }
      if (props.selectedSize === props.itemsSize) {
        return 'all'
      }
      return 'some'
    })
    return {
      handleSelectAll,
      selectedState
    }
  }
})
</script>
<template>
  <a-checkbox
    v-bind="$attrs"
    :model-value="selectedState === 'all'"
    :mixed="selectedState === 'some'"
    :label="label"
    @update:model-value="handleSelectAll"></a-checkbox>
</template>
