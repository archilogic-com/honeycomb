<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue'
import { ATable, ATableRow, ATableCell, ATableHeader } from '../components'

type Row = {
  id: string
  name: string
  lastUpdate: string
  area: number
  label: string
}

function getRow(index: number): Row {
  return {
    id: '' + index,
    name: 'Floor ' + index,
    lastUpdate: `Today, 3:2${index - 1} PM`,
    area: 2430 + index + 2,
    label: 'Label ' + index
  }
}

export default defineComponent({
  name: 'SortingTableExample',
  components: {
    ATable,
    ATableRow,
    ATableHeader,
    ATableCell
  },

  setup() {
    const rows: Row[] = [...Array(3)].map((x, i) => getRow(i + 1))
    const sortedBy: Ref<keyof Row> = ref('name')
    const sortDirection: Ref<'asc' | 'desc'> = ref('asc')
    const sortedRows = computed(() => {
      const rowsCopy = rows.map(r => r)
      // sorting the mapped array containing the reduced values
      return rowsCopy.sort((a, b) => {
        let first
        let last
        if (sortDirection.value === 'asc') {
          first = a[sortedBy.value]
          last = b[sortedBy.value]
        } else {
          last = a[sortedBy.value]
          first = b[sortedBy.value]
        }

        if (first > last) {
          return 1
        }
        if (first < last) {
          return -1
        }
        return 0
      })
    })

    const updateSort = (key: keyof Row) => {
      if (sortedBy.value === key) {
        sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
      } else {
        sortedBy.value = key
      }
    }

    return {
      sortedRows,
      sortedBy,
      sortDirection,
      updateSort
    }
  }
})
</script>
<template>
  <a-table>
    <template #header>
      <a-table-header
        :sorted-by="sortedBy === 'name' ? sortDirection : ''"
        @click="updateSort('name')">
        Name
      </a-table-header>
      <a-table-header
        :sorted-by="sortedBy === 'lastUpdate' ? sortDirection : ''"
        @click="updateSort('lastUpdate')">
        Last Update
      </a-table-header>
      <a-table-header
        :sorted-by="sortedBy === 'area' ? sortDirection : ''"
        @click="updateSort('area')">
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
