import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ATable, ATableRow, ATableCell, ATableHeader, ALink, AListbox } from '../components'
import MultiSelectTableExample from '../examples/MultiSelectTableExample.vue'
import SortingTableExample from '../examples/SortingTableExample.vue'

const meta: Meta<typeof ATable> = {
  title: 'Components/Table',
  component: ATable,
  subcomponents: { ATableHeader, ATableRow, ATableCell }
}

export default meta

type Story = StoryObj<typeof ATable>

export const Simple: Story = {
  name: 'simple',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table>
            <template #header>
                <a-table-header>Name</a-table-header>
                <a-table-header>Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const VerticalScrolling: Story = {
  name: 'vertical scrolling',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow, ALink, AListbox },
    template: `
        <a-table class="h-[120px]">
            <template #header>
                <a-table-header class="w-1/2">Name</a-table-header>
                <a-table-header class="w-1/5">Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const HorizontalScrolling: Story = {
  name: 'horizontal scrolling',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
      <div class="w-1/2 overflow-x-auto">
        <a-table class="min-w-[1000px] w-full">
            <template #header>
                <a-table-header class="w-1/2">Name</a-table-header>
                <a-table-header class="w-1/5">Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
        </div>
      `
  })
}

export const EllipsisAndComponents: Story = {
  name: 'ellipsis and components',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow, ALink, AListbox },
    template: `
        <a-table class="h-[150px] w-[400px]">
            <template #header>
                <a-table-header>Truncate true</a-table-header>
                <a-table-header>Truncate false</a-table-header>
            </template>
            <a-table-row>
              <a-table-cell>
                <a-listbox
                  model-value=""
                  size="md"
                  placeholder="Options are hidden"
                  :options="[
                    { value: '#ff0000', label: 'Red' },
                    { value: '#00ff00', label: 'Green' },
                    { value: '#0000ff', label: 'Blue' }
                  ]"></a-listbox>
                </a-table-cell>
                <a-table-cell :truncate="false">
                  <a-listbox
                    model-value=""
                    size="md"
                    placeholder="Options are visible"
                    :options="[
                      { value: '#ff0000', label: 'Red' },
                      { value: '#00ff00', label: 'Green' },
                      { value: '#0000ff', label: 'Blue' }
                  ]"></a-listbox>
                </a-table-cell>
            </a-table-row>
            <a-table-row>
              <a-table-cell>A very long name that has been truncated with ellipsis</a-table-cell>
               <a-table-cell :truncate="false">A very long name that has  not been truncated with ellipsis</a-table-cell>
            </a-table-row>
            <a-table-row>
              <a-table-cell><a-link>This very long link text has been cut off</a-link></a-table-cell>
              <a-table-cell :truncate="false"><a-link>This link text has been wrapped</a-link></a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const WidthInHeader: Story = {
  name: 'width in header',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table>
            <template #header>
                <a-table-header class="w-1/2">Name</a-table-header>
                <a-table-header class="w-1/5">Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const WidthInColgroup: Story = {
  name: 'width in colgroup',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table>
          <template #colgroup>
            <colgroup>
              <col>
              <col class="w-2/6">
              <col class="w-1/6">
            </colgroup>
          </template>
          <template #header>
              <a-table-header>Name</a-table-header>
              <a-table-header>Last update</a-table-header>
              <a-table-header class="w-2/6">Floor area</a-table-header>
          </template>
          <a-table-row>
              <a-table-cell>Some test floor name</a-table-cell>
              <a-table-cell>Today, 3:21 PM</a-table-cell>
              <a-table-cell>2,431</a-table-cell>
          </a-table-row>
            <a-table-row>
              <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
              <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
              <a-table-cell>9,999924</a-table-cell>
          </a-table-row>
        </a-table>
      `
  })
}

export const Background: Story = {
  name: 'background',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table background="whisper">
            <template #header>
                <a-table-header>Name</a-table-header>
                <a-table-header>Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const BodySm: Story = {
  name: 'body sm',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table size="sm">
            <template #header>
                <a-table-header>Name</a-table-header>
                <a-table-header>Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
            <a-table-row>
                <a-table-cell>Some test floor name</a-table-cell>
                <a-table-cell>Today, 3:21 PM</a-table-cell>
                <a-table-cell>2,431</a-table-cell>
            </a-table-row>
             <a-table-row>
                <a-table-cell>Another floor with a much much much much longer name</a-table-cell>
                <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                <a-table-cell>9,999924</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const BodyCustom: Story = {
  name: 'body custom',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table size="sm">
            <template #header>
                <a-table-header>Space</a-table-header>
                <a-table-header>Floor Area</a-table-header>
                <a-table-header>Seats</a-table-header>
            </template>
            <a-table-row class="body-md-500">
              <a-table-cell
                >Total (2)</a-table-cell>
              <a-table-cell>500</a-table-cell>
              <a-table-cell>5</a-table-cell>
            </a-table-row>
            <a-table-row>
              <a-table-cell
              >Office</a-table-cell>
              <a-table-cell>450</a-table-cell>
              <a-table-cell>4</a-table-cell>
            </a-table-row>
        </a-table>
      `
  })
}

export const SortingRows: Story = {
  name: 'sorting rows',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { SortingTableExample },
    template: `<SortingTableExample></SortingTableExample>`
  })
}

export const SelectedRow: Story = {
  name: 'selected row',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table>
            <template #header>
                <a-table-header>Name</a-table-header>
                <a-table-header>Last update</a-table-header>
                <a-table-header>Floor area</a-table-header>
            </template>
              <a-table-row>
                  <a-table-cell>Some test floor name</a-table-cell>
                  <a-table-cell>Today, 3:21 PM</a-table-cell>
                  <a-table-cell>2,431</a-table-cell>
              </a-table-row>
              <a-table-row selected>
                  <a-table-cell>Another floor with a much much longer name</a-table-cell>
                  <a-table-cell>Yesterday, 11:05 AM</a-table-cell>
                  <a-table-cell>9,999924</a-table-cell>
              </a-table-row>
        </a-table>
      `
  })
}

export const SelectingRows: Story = {
  name: 'selecting rows',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { MultiSelectTableExample },
    template: `<MultiSelectTableExample></MultiSelectTableExample>`
  })
}

export const Expandable: Story = {
  name: 'expandable',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { ATable, ATableHeader, ATableCell, ATableRow },
    template: `
        <a-table>
            <template #header>
                <a-table-header>Space</a-table-header>
                <a-table-header>Floor Area</a-table-header>
                <a-table-header>Seats</a-table-header>
            </template>
            <a-table-row>
                <template #default="{ expanded, toggleRow }">
                    <a-table-cell
                      :expanded="expanded"
                      :toggle-callback="toggleRow"
                    >Storage</a-table-cell>
                    <a-table-cell>235</a-table-cell>
                    <a-table-cell>0</a-table-cell>
                </template>
                <template #nested>
                  <a-table-row>
                      <a-table-cell colspan="3" class="pl-10">Plastic chair</a-table-cell>
                  </a-table-row>
                  <a-table-row>
                      <a-table-cell colspan="3" class="pl-10">Plastic chair</a-table-cell>
                  </a-table-row>
                </template>
            </a-table-row>
            <a-table-row>
                <template #default="{ expanded, toggleRow }">
                    <a-table-cell
                      :expanded="expanded"
                      :toggle-callback="toggleRow"
                    >Office</a-table-cell>
                    <a-table-cell>450</a-table-cell>
                    <a-table-cell>4</a-table-cell>
                </template>
                <template #nested>
                  <a-table-row>
                      <a-table-cell colspan="3" class="pl-10">Desk 160x80</a-table-cell>
                  </a-table-row>
                  <a-table-row>
                      <a-table-cell colspan="3" class="pl-10">Macbook Air</a-table-cell>
                  </a-table-row>
                </template>
            </a-table-row>
        </a-table>
      `
  })
}
