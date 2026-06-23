import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AIcon } from '../components'
import icons, { DEPRECATED_ICONS } from '../components/icons'

type IconArgs = ComponentProps<typeof AIcon> & { size: 'sm' | 'md' | 'lg' | 'other' }

const meta: Meta<IconArgs> = {
  title: 'Components/Icons',
  component: AIcon,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'other'],
      control: 'radio'
    }
  }
}

export default meta

type Story = StoryObj<IconArgs>

const toKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

const render = (args: IconArgs) => ({
  components: { AIcon },
  setup() {
    const getIconId = (name: string) => `${toKebabCase(name)}-${args.size}`
    return { args, icons, DEPRECATED_ICONS, getIconId }
  },
  template: `
  <div class="grid grid-cols-4">
    <div class="m-4 flex flex-col text-navy" v-for="(icon, name) in icons.${args.size}">
      <div class="flex items-center">
        <a-icon :size="args.size" :name="name" />
        <span class="ml-3 body-md">{{name}}</span>
        <span v-if="DEPRECATED_ICONS[args.size].includes(name)" class="text-error body-xs-600 mx-1">(deprecated)</span>
      </div>
      <code class="text-xs text-warsaw mt-1">{{getIconId(name)}}</code>
    </div>
  </div>
  `
})

export const Small: Story = { name: 'small', render, args: { size: 'sm' } }

export const Medium: Story = { name: 'medium', render, args: { size: 'md' } }

export const Large: Story = { name: 'large', render, args: { size: 'lg' } }

export const Other: Story = { name: 'other', render, args: { size: 'other' } }

export const ChangeColor: Story = {
  name: 'change color',
  render: () => ({
    components: { AIcon },
    template: `<div class="flex items-center text-error"><a-icon icon="warning-other"/>This is a red error message.</div>`
  })
}
