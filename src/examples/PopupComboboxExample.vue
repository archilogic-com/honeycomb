<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ACombobox, APopupButton, APopupCombobox } from '../components'

const users = [
  { label: 'Joe Doe', value: 'joe@archilogic.com' },
  { label: 'Anna Smith', value: 'anna@archilogic.com' },
  { label: 'Clark Brown', value: 'clark@archilogic.com' },
  { label: 'Will Schmidt', value: 'will@archilogic.com' }
]

export default defineComponent({
  name: 'PopupComboboxExample',
  components: { ACombobox, APopupButton, APopupCombobox },
  setup() {
    const selectedMembers = ref([users[0].value])
    return {
      selectedMembers,
      users
    }
  }
})
</script>
<template>
  <div class="flex gap-4">
    <div class="w-[140px]">
      Team members:
      <ul>
        <li v-for="user in selectedMembers" :key="user">
          <p>{{ user }}</p>
        </li>
      </ul>
    </div>
    <APopupCombobox>
      <template #button="{ open, aria }">
        <APopupButton :open="open" v-bind="aria">Add team members</APopupButton>
      </template>
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #default="{ close, comboboxProps }">
        <!-- use the `close()` method to close the popup programmatically-->
        <ACombobox
          v-bind="comboboxProps"
          v-model="selectedMembers"
          placeholder="Search members"
          :options="users" />
      </template>
    </APopupCombobox>
  </div>
</template>
