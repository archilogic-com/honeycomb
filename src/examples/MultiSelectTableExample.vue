<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useMultiSelect from '../composables/multiSelect'
import {
  ATable,
  ATableRow,
  ATableCell,
  ATableHeader,
  AButton,
  AToggle,
  ACheckbox,
  ACheckboxSelectAll
} from '../components'

export default defineComponent({
  name: 'MultiSelectTableExample',
  components: {
    ATable,
    ATableRow,
    ATableHeader,
    ATableCell,
    AButton,
    AToggle,
    ACheckbox,
    ACheckboxSelectAll
  },

  setup() {
    const headers = ['Name', 'Last Update', 'Floor area']
    let lastKey = 0
    function getRow() {
      lastKey++

      return {
        id: '' + lastKey,
        name: 'Floor ' + lastKey,
        lastUpdate: 'Today, 3:21 PM',
        area: '2,431'
      }
    }
    const rows = ref([getRow(), getRow(), getRow(), getRow(), getRow(), getRow()])

    const rowIds = computed(() => rows.value.map(row => row.id))

    const showCheckboxes = ref(false)

    const { selectItem, selectedItems, selectAll, clearSelection } = useMultiSelect(
      rowIds,
      showCheckboxes
    )

    const addSomeRows = () => {
      rows.value.push(getRow(), getRow())
    }

    const removeSomeRows = () => {
      rows.value = [rows.value[0], rows.value[rows.value.length - 1]]
    }

    const selectedRows = ref([])

    return {
      headers,
      rows,
      selectItem,
      selectedItems,
      addSomeRows,
      removeSomeRows,
      showCheckboxes,
      selectAll,
      clearSelection,
      selectedRows
    }
  }
})
</script>
<template>
  <div>
    <a-table>
      <template #header>
        <a-table-header v-if="showCheckboxes" class="w-10">
          <template #component>
            <a-checkbox-select-all
              :selected-size="selectedItems.size"
              :items-size="rows.length"
              hide-label
              @select="selectAll"
              @clear="clearSelection"></a-checkbox-select-all>
          </template>
        </a-table-header>
        <a-table-header v-for="header in headers" :key="header">{{ header }}</a-table-header>
      </template>
      <a-table-row
        v-for="row in rows"
        :key="row.id"
        :select-id="row.id"
        :select-row-callback="selectItem"
        :selected="selectedItems.has(row.id)">
        <a-table-cell v-if="showCheckboxes" padding="sm">
          <a-checkbox :model-value="selectedItems.has(row.id)" controlled></a-checkbox>
        </a-table-cell>
        <a-table-cell>{{ row.name }}</a-table-cell>
        <a-table-cell>{{ row.lastUpdate }}</a-table-cell>
        <a-table-cell>{{ row.area }}</a-table-cell>
      </a-table-row>
    </a-table>
    <div class="my-4 flex w-full justify-between px-8">
      <div class="flex items-center space-x-8">
        <a-button @click="addSomeRows">Add rows</a-button>
        <a-button @click="removeSomeRows">Remove rows</a-button>
        <p class="body-md">Adding or removing rows will clear the current selection.</p>
      </div>
      <div class="flex items-center">
        <span id="checkboxes-toggle">Show checkboxes</span>
        <a-toggle v-model="showCheckboxes" label-id="checkboxes-toggle"></a-toggle>
      </div>
    </div>
  </div>
</template>
