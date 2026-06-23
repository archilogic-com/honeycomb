import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AArrowKeyFocusable, ASeparator, AButton } from '../components'

const meta: Meta<typeof AArrowKeyFocusable> = {
  title: 'Components/ArrowKeyFocusable',
  component: AArrowKeyFocusable
}

export default meta

type Story = StoryObj<typeof AArrowKeyFocusable>

export const ListVertical: Story = {
  name: 'list vertical',
  render: () => ({
    components: { AArrowKeyFocusable },
    template: `
        <a-arrow-key-focusable class="focus:focus-shadow" as="ul">
          <li tabindex="-1" class="focus:focus-shadow">1</li>
          <li tabindex="-1" class="focus:focus-shadow">2</li>
          <li tabindex="-1" class="focus:focus-shadow">3</li>
        </a-arrow-key-focusable>
        `
  })
}

export const ButtonsHorizontal: Story = {
  name: 'buttons horizontal',
  render: () => ({
    components: { AArrowKeyFocusable, AButton },
    template: `
          <a-arrow-key-focusable class="focus:focus-shadow flex" direction="horizontal">
            <a-button tabindex="-1" class="focus:focus-shadow">1</a-button>
            <a-button tabindex="-1" class="focus:focus-shadow">2</a-button>
            <a-button tabindex="-1" class="focus:focus-shadow">3</a-button>
          </a-arrow-key-focusable>
        `
  })
}

export const UnfocusableChildren: Story = {
  name: 'unfocusable children',
  render: () => ({
    components: { AArrowKeyFocusable, ASeparator, AButton },
    template: `
          <a-arrow-key-focusable class="focus:focus-shadow">
            <h1>Example widget</h1>
            <div tabindex="-1" class="focus:focus-shadow bg-athens mb-1">1</div>
            <div tabindex="-1" class="focus:focus-shadow bg-athens mb-1">2</div>
            <a-separator class="my-2"/>
            <div tabindex="-1" class="focus:focus-shadow bg-athens mb-1">3</div>
          </a-arrow-key-focusable>
        `
  })
}
