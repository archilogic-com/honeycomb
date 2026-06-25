import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ALabelContainer, ATextInput, AIcon, AButton } from '../components'

type LabelContainerArgs = ComponentProps<typeof ALabelContainer> & {
  labelSlot?: string
  default?: string
}

const meta: Meta<LabelContainerArgs> = {
  title: 'Components/LabelContainer',
  component: ALabelContainer
}

export default meta

type Story = StoryObj<LabelContainerArgs>

const render = (args: LabelContainerArgs) => ({
  components: { ALabelContainer, ATextInput, AIcon, AButton },
  setup() {
    return { args }
  },
  template: `
  <ALabelContainer v-bind="args" class="w-[240px]">
  <template v-if="args.labelSlot" #label>${args.labelSlot}</template>
  ${args.default || ''}
  </ALabelContainer>`
})

const defaultArgs = {
  label: 'Some ID',
  value: 'we12ae3124543123123'
}

export const Row: Story = {
  name: 'row',
  render,
  args: {
    ...defaultArgs,
    labelClasses: 'w-1/3',
    align: 'row'
  }
}

export const Col: Story = {
  name: 'col',
  render,
  args: {
    ...defaultArgs,
    align: 'col'
  }
}

export const RowJustifyBetween: Story = {
  name: 'row justify-between',
  render,
  args: {
    label: 'class',
    value: 'justify-between',
    class: 'justify-between',
    align: 'row'
  }
}

export const RowLabelClasses: Story = {
  name: 'row label classes',
  render,
  args: {
    label: 'labelClasses',
    value: 'mr-auto',
    labelClasses: 'mr-auto',
    align: 'row'
  }
}

export const RowValueClasses: Story = {
  name: 'row value classes',
  render,
  args: {
    label: 'valueClasses',
    value: 'ml-auto',
    valueClasses: 'ml-auto',
    align: 'row'
  }
}

export const XsRow: Story = {
  name: 'xs row',
  render,
  args: {
    ...defaultArgs,
    size: 'xs',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const SmRow: Story = {
  name: 'sm row',
  render,
  args: {
    ...defaultArgs,
    size: 'sm',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const MdRow: Story = {
  name: 'md row',
  render,
  args: {
    ...defaultArgs,
    size: 'md',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const LgRow: Story = {
  name: 'lg row',
  render,
  args: {
    ...defaultArgs,
    size: 'lg',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const XsCol: Story = {
  name: 'xs col',
  render,
  args: {
    ...defaultArgs,
    size: 'xs',
    align: 'col'
  }
}

export const SmCol: Story = {
  name: 'sm col',
  render,
  args: {
    ...defaultArgs,
    size: 'sm',
    align: 'col'
  }
}

export const MdCol: Story = {
  name: 'md col',
  render,
  args: {
    ...defaultArgs,
    size: 'md',
    align: 'col'
  }
}

export const LgCol: Story = {
  name: 'lg col',
  render,
  args: {
    ...defaultArgs,
    size: 'lg',
    align: 'col'
  }
}

export const LabelSlot: Story = {
  name: 'label slot',
  render,
  args: {
    value: 'abcdefg123456',
    labelSlot: `<a-icon class="mr-1" icon="flag-sm"/> Important key`,
    align: 'col'
  }
}

export const DefaultSlotWithInput: Story = {
  name: 'default slot with input',
  render,
  args: {
    label: 'Width',
    default: `<a-text-input />`,
    size: 'md'
  }
}

export const DefaultWithButton: Story = {
  name: 'default with button',
  render,
  args: {
    ...defaultArgs,
    default: `<div class="flex items-center overflow-hidden"><span class="truncate">1234567890-098765432-0865434567876543</span><a-button variant="subtle" icon="copy-md" label="Copy ID"></a-button></div>`
  }
}

export const LongLabel: Story = {
  name: 'long label',
  render,
  args: {
    ...defaultArgs,
    label: 'A very long and boring label that goes onto the next line',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const LongValue: Story = {
  name: 'long value',
  render,
  args: {
    ...defaultArgs,
    value: 'A very long and boring value that goes onto the next line',
    align: 'row',
    labelClasses: 'w-1/3'
  }
}

export const LongLabelCol: Story = {
  name: 'long label col',
  render,
  args: {
    ...defaultArgs,
    label: 'A very long and boring label that goes onto the next line',
    align: 'col'
  }
}

export const LongValueCol: Story = {
  name: 'long value col',
  render,
  args: {
    ...defaultArgs,
    value: 'A very long and boring value that goes onto the next line',
    align: 'col'
  }
}
