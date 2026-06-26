import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { APanel, AButton } from '../components'

type PanelArgs = ComponentProps<typeof APanel> & { slots: string[]; class?: string }

const meta: Meta<PanelArgs> = {
  title: 'Components/Panel',
  component: APanel
}

export default meta

type Story = StoryObj<PanelArgs>

const titleSlot = `
  <template #title>
    My fancy panel
  </template>
`

const bodySlot = `
  <template #body>
    <p>Some panel content</p>
  </template>
`

const actionsSlot = `
  <template #actions>
    <a-button variant="primary" size="lg" @click="() => {}">OK</a-button>
  </template>
`

const render = (args: PanelArgs) => ({
  components: { APanel, AButton },
  setup() {
    const { slots, ...props } = args
    return {
      slots,
      props
    }
  },
  template: `
  <div class="w-[600px] m-4">
    <APanel v-bind="props">${args.slots.join('')}
    </APanel>
  </div>`
})

export const All: Story = {
  name: 'all',
  render,
  args: {
    slots: [titleSlot, bodySlot, actionsSlot]
  }
}

export const NoTitle: Story = {
  name: 'no title',
  render,
  args: {
    slots: [bodySlot, actionsSlot]
  }
}

export const NoActions: Story = {
  name: 'no actions',
  render,
  args: {
    slots: [titleSlot, bodySlot]
  }
}

export const ScrollableBody: Story = {
  name: 'scrollable body',
  render,
  args: {
    slots: [
      titleSlot,
      `
          <template #body>
            <p class="bg-palegreen h-[800px]">Some panel content</p>
          </template>
        `,
      actionsSlot
    ],
    class: 'h-[400px]'
  }
}
