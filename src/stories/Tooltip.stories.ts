import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ATooltip, AButton } from '../components'

type TooltipProps = ComponentProps<typeof ATooltip>

const meta: Meta<TooltipProps> = {
  component: ATooltip,
  title: 'Components/Tooltip',
  args: {
    content: 'Peekaboo!'
  }
}

export default meta

type Story = StoryObj<TooltipProps>

const renderTooltip = (args: ComponentProps<TooltipProps>) => ({
  components: { ATooltip, AButton },
  setup() {
    return { args }
  },
  template: `
  <ATooltip v-bind="args" v-slot="slotProps">
    <a-button v-bind="slotProps" icon="User" size="md"></a-button>
  </ATooltip>`
})

export const Primary: Story = {
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-start justify-center"><story/></div>`
    })
  ],
  render: renderTooltip
}
export const Bottom: Story = {
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-end justify-center"><story/></div>`
    })
  ],
  render: renderTooltip
}

export const Left: Story = {
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-center justify-start"><story/></div>`
    })
  ],
  render: renderTooltip
}

export const Right: Story = {
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-start justify-end"><story/></div>`
    })
  ],
  render: renderTooltip
}

export const WithShortcut: Story = {
  render: renderTooltip,
  args: {
    shortcut: 'K'
  }
}
