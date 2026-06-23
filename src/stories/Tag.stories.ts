import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ATag, AColorCircle } from '../components'

type TagArgs = Omit<ComponentProps<typeof ATag>, 'color'> & {
  // widened to string: a story intentionally demos a non-palette color value
  color?: string
  default?: string
  href?: string
  onClick?: () => void
  onRemove?: () => void
}

const meta: Meta<TagArgs> = {
  title: 'Components/Tag',
  component: ATag
}

export default meta

type Story = StoryObj<TagArgs>

const render = (args: TagArgs) => ({
  components: { ATag, AColorCircle },
  setup() {
    return { args }
  },
  template: `
  <ATag v-bind="args">${args.default || ''}</ATag>`
})

export const RoundTagRemovable: Story = {
  name: 'round tag removable',
  render,
  args: {
    default: 'Nonsense',
    removable: true
  }
}

export const Color: Story = {
  name: 'color',
  render,
  args: {
    color: 'pink',
    default: 'Pink tag'
  }
}

export const TagWithOnClick: Story = {
  name: 'tag with onClick',
  render,
  args: {
    content: 'Click me',
    onClick: () => console.log('click event')
  }
}

export const TagRemovableWithOnClick: Story = {
  name: 'tag removable with onClick',
  render,
  args: {
    content: 'Click me',
    removable: true,
    onClick: () => console.log('click event'),
    onRemove: () => console.log('remove event')
  }
}

export const TagWithHref: Story = {
  name: 'tag with href',
  render,
  args: {
    content: 'Tag link',
    href: '#'
  }
}

export const TagRemovableWithHref: Story = {
  name: 'tag removable with href',
  render,
  args: {
    content: 'Tag link',
    removable: true,
    href: '#',
    onRemove: () => console.log('remove event')
  }
}

export const TagDefaultSlot: Story = {
  name: 'tag default slot',
  render,
  args: {
    default: `Green label <a-color-circle color="sanfran" class="ml-1" />`
  }
}
