import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ATooltip, AButton } from '../components'
import { userEvent, waitFor, within } from '@storybook/testing-library'

type TooltipProps = ComponentProps<typeof ATooltip>

/**
 * A tooltip component provides extra information about the control that triggers it.
 * It serves as an accessible label or description of a given control (see `type` prop).
 *
 * Only interactive elements should trigger tooltips,
 * and the tooltip itself cannot contain any interactive content.
 *
 * Do not put any essential information inside a tooltip,
 * and always assume some users (e.g. on touch devices) will never see it.
 *
 * The tooltips are shown on mouseenter and focus events, and hidden on mouseleave and blur events,
 * or with an ESC key while the control is focused.
 *
 * Tooltips are positioned automatically and re-positioned if the content is scrolled,
 * taking into account available space (handled by [Floating UI](https://floating-ui.com/docs/getting-started)).
 */
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

const hoverButton = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')
  await waitFor(async () => {
    await userEvent.hover(button)
  })
}

/**
 * Below are examples of differently positioned tooltips
 * based on available space on various sides of the screen.
 *
 * The positioning logic is handled by the [Floating UI](https://floating-ui.com/docs/vue#options) library,
 * with the use of `flip()` and `shift()` [middleware](https://floating-ui.com/docs/middleware).
 *
 * If there's available space on every side of the tooltip,
 * it is rendered on the top center of the control.
 */
export const Primary: Story = {
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-center justify-center"><story/></div>`
    })
  ],
  render: renderTooltip,
  play: hoverButton
}

export const Bottom: Story = {
  ...Primary,
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-start justify-center"><story/></div>`
    })
  ]
}

export const Top: Story = {
  ...Primary,
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-end justify-center"><story/></div>`
    })
  ]
}

export const Right: Story = {
  ...Primary,
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-center justify-start"><story/></div>`
    })
  ]
}

export const Left: Story = {
  ...Primary,
  decorators: [
    () => ({
      template: `<div class="w-full h-[200px] flex items-center justify-end"><story/></div>`
    })
  ]
}

/**
 * Multiline content should run no more than 4 lines.
 * Tooltip's max width is limited to 160px.
 */
export const Multiline: Story = {
  ...Primary,
  args: {
    content: 'Tooltip content can span over multiple lines'
  }
}
