import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { nextTick } from 'vue'
import { within } from 'storybook/test'

import {
  APopup,
  APopupButton,
  APopupCombobox,
  APanelCombobox,
  AButton,
  APanel
} from '../components'
import PopupComboboxExample from '../examples/PopupComboboxExample.vue'

const meta: Meta<typeof APopup> = {
  title: 'Components/Popup',
  component: APopup,
  subcomponents: { APopupButton, APopupCombobox, APanelCombobox },
  parameters: { layout: 'fullscreen', chromatic: { delay: 1000 } },
  decorators: [
    () => ({
      template: `
      <div class="overflow-hidden w-full p-4">
        <div style="width: 300px; height: 300px; display: flex; justify-content: flex-start;">
          <story/>
        </div>
      </div>`
    })
  ]
}

export default meta

type Story = StoryObj<typeof APopup>

const render = (args: ComponentProps<typeof APopup>) => ({
  components: { APopup, APopupButton, APanel, AButton },
  setup() {
    return { args }
  },
  template: `
  <APopup v-bind="args">
    <template #button="{open, aria}">
      <APopupButton :open="open" v-bind="aria">Filters</APopupButton>
    </template>
    <template #default="{close}">
      <APanel title="Update name" class="w-[300px]">
        <template #body>Some content inside</template>
        <template #actions>
          <AButton variant="primary" @click="close">Ok</AButton>
          <AButton @click="close">Cancel</AButton>
        </template>
      </APanel>
    </template>
  </APopup>`
})

const openPopup = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').click()
}

const openAndClosePopup = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement)
  await canvas.getByRole('button').click()
  await nextTick()
  await canvas.getByRole('button', { name: 'Ok' }).click()
}

export const Basic: Story = {
  name: 'basic',
  play: openPopup,
  render
}

export const Close: Story = {
  name: 'close',
  play: openAndClosePopup,
  render
}

export const OpenByDefault: Story = {
  name: 'open by default',
  render,
  args: { open: true }
}

export const OpeningUpwards: Story = {
  name: 'opening upwards',
  render,
  args: { direction: 'up' },
  play: openPopup,
  decorators: [
    () => ({
      template: `
        <div class="mt-auto">
          <story/>
        </div>
      `
    })
  ]
}

export const RightAligned: Story = {
  name: 'right-aligned',
  render,
  args: { align: 'right' },
  play: openPopup,
  decorators: [
    () => ({
      template: `
        <div class="ml-auto">
          <story/>
        </div>
      `
    })
  ]
}

export const ComboboxPopup: Story = {
  name: 'combobox-popup',
  play: openPopup,
  render: () => ({
    components: { PopupComboboxExample },
    template: `
    <PopupComboboxExample></PopupComboboxExample>
    `
  })
}
