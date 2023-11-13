import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

import ASwitcher from '../components/Switcher.vue'
import AIcon from '../components/Icon.vue'

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

type SwitcherProps = ComponentProps<typeof ASwitcher>

const renderSwitcher = (args: SwitcherProps) => ({
  components: { ASwitcher },
  setup() {
    const selected = ref(args.options[0].value)

    return { selected, args }
  },
  template: `
      <ASwitcher v-model="selected" v-bind="args" />`
})

export const Primary: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Metric', value: 'm' },
      { label: 'Imperial', value: 'i' }
    ],
    label: 'Units'
  }
}

export const ThreeOptions: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Map', value: 'map' },
      { label: 'Tiles', value: 'tile' },
      { label: 'Table', value: 'table' }
    ],
    label: 'View'
  }
}
export const DisabledOption: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Map', value: 'map' },
      { label: 'Tiles', value: 'tile', disabled: true },
      { label: 'Table', value: 'table' }
    ],
    label: 'View'
  }
}

export const DisabledSwitcher: Story = {
  render: renderSwitcher,
  args: {
    ...ThreeOptions.args,
    disabled: true
  }
}

export const IconOptions: Story = {
  render: renderSwitcher,
  args: {
    options: [
      { label: 'Basic search', value: 'basic', icon: 'Search' },
      { label: 'AI search', value: 'ai', icon: 'Ai' }
    ],
    label: 'Search type'
  }
}

export const UsingSlots: Story = {
  render: args => ({
    components: { ASwitcher, AIcon },
    setup() {
      const selected = ref(args.options[0].value)

      return { selected, args }
    },
    template: `
      <ASwitcher v-model="selected" v-bind="args">
        <template #ai><a-icon name="ai" size="sm" class="mr-1"/> AI search</template>
      </ASwitcher>`
  }),
  args: {
    options: [
      { label: 'Basic search', value: 'basic' },
      { label: 'AI search', value: 'ai' }
    ],
    label: 'Search type'
  }
}

export const RaisedSwitcher: Story = {
  render: renderSwitcher,
  args: {
    ...Primary.args,
    raised: true
  }
}
