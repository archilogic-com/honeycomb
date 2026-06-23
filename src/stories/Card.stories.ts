import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ACard, ALogo } from '../components'
import floorplanUrl from './assets/floorplan_thumbnail.jpeg'

type CardArgs = ComponentProps<typeof ACard> & {
  default?: string
  classes?: string
  href?: string
  onClick?: () => void
}

const meta: Meta<CardArgs> = {
  title: 'Components/Card',
  component: ACard
}

export default meta

type Story = StoryObj<CardArgs>

const render = (args: CardArgs) => ({
  components: { ACard, ALogo },
  setup() {
    return { args, floorplanUrl }
  },
  template: `
  <ACard v-bind="args" :class="args.classes || 'w-[200px] p-4 flex-col items-center'">${
    args.default || '<img :src="floorplanUrl" />Demo Floor'
  }
  </ACard>`
})

export const Button: Story = {
  name: 'button',
  render,
  args: {
    onClick: () => {
      console.log('clicked')
    }
  }
}

export const Link: Story = {
  name: 'link',
  render,
  args: {
    href: '#'
  }
}

export const Div: Story = {
  name: 'div',
  render
}

export const Active: Story = {
  name: 'active',
  render,
  args: {
    onClick: () => {
      console.log('clicked')
    },
    active: true
  }
}

export const Styling: Story = {
  name: 'styling',
  render,
  args: {
    onClick: () => {},
    classes: 'w-[400px] flex-col-reverse items-center overflow-hidden'
  }
}

export const Content: Story = {
  name: 'content',
  render,
  args: {
    onClick: () => {},
    classes: 'flex my-4',
    default:
      '<div class="flex bg-white p-4"><div class="heading-sm">I can be anything</div><a-logo></a-logo></div>'
  }
}
