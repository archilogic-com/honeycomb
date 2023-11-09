import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import ASwitcher from '../components/Switcher.vue'

const meta: Meta<typeof ASwitcher> = {
  component: ASwitcher,
  title: 'Components/Switcher',
  decorators: [
    () => ({
      template: `<div class="p-10 bg-white"><story/></div>`
    })
  ]
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

      return { selected, options }
    },
    template: `
        <ASwitcher v-model="selected" :options="options" label="Units" />`
  })
}
