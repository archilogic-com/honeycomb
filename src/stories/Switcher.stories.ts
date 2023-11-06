import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import ASwitcher from '../components/Switcher.vue'

const meta: Meta<typeof ASwitcher> = {
  component: ASwitcher,
  title: 'Components/Switcher'
}

export default meta

type Story = StoryObj<typeof ASwitcher>

export const Primary: Story = {
  render: () => ({
    components: { ASwitcher },
    setup() {
      const options = [
        { label: 'metric', value: 'm' },
        { label: 'imperial', value: 'i' }
      ]
      const selected = ref('m')
      const updateValue = (newValue: string) => {
        selected.value = newValue
      }
      return { selected, options, updateValue }
    },
    template: `<div class="p-4 bg-white">
        <ASwitcher :model-value="selected" :options="options" label="Units" @update:modelValue="updateValue" />
      </div>`
  })
}
