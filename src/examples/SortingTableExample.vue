<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSorting } from '../composables/sorting'
import { ATable, ATableRow, ATableCell, ATableHeader } from '../components'

export default defineComponent({
  name: 'SortingTableExample',
  components: {
    ATable,
    ATableRow,
    ATableHeader,
    ATableCell
  },

  setup() {
    let lastKey = 0
    function getRow() {
      lastKey++

      return {
        id: '' + lastKey,
        name: 'Floor ' + lastKey,
        lastUpdate: `Today, 3:2${lastKey} PM`,
        area: 2430 + lastKey,
        label: 'Label ' + lastKey
      }
    }
    const rows = [getRow(), getRow(), getRow()]

    const { getSortIndicator, updateSortType, sortData } = useSorting({ sortInitial: 'name' })
    const sortedRows = computed(() => sortData(rows))

    return {
      getSortIndicator,
      updateSortType,
      sortedRows
    }
  }
})
</script>
<template>
  <a-table>
    <template #header>
      <a-table-header :sorted-by="getSortIndicator('name')" @click="updateSortType('name')">
        Name
      </a-table-header>
      <a-table-header
        :sorted-by="getSortIndicator('lastUpdate')"
        @click="updateSortType('lastUpdate')">
        Last Update
      </a-table-header>
      <a-table-header :sorted-by="getSortIndicator('area')" @click="updateSortType('area')">
        Area
      </a-table-header>
      <a-table-header :sortable="false">Label</a-table-header>
    </template>
    <a-table-row v-for="row in sortedRows" :key="row.id">
      <a-table-cell>{{ row.name }}</a-table-cell>
      <a-table-cell>{{ row.lastUpdate }}</a-table-cell>
      <a-table-cell>{{ row.area }}</a-table-cell>
      <a-table-cell>{{ row.label }}</a-table-cell>
    </a-table-row>
  </a-table>
</template>
