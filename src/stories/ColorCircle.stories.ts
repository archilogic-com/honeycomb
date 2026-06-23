import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AColorCircle } from '../components'

const meta: Meta<typeof AColorCircle> = {
  title: 'Components/ColorCircle',
  component: AColorCircle,
  argTypes: {
    class: {
      control: false
    },
    color: {
      control: 'text'
    },
    borderColor: {
      control: 'text'
    },
    size: {
      control: ['md', 'lg']
    }
  }
}

export default meta

type Story = StoryObj<typeof AColorCircle>

const render = (args: ComponentProps<typeof AColorCircle>) => ({
  components: { AColorCircle },
  setup() {
    return { args }
  },
  template: `
  <AColorCircle v-bind="args"></AColorCircle>`
})

export const ArchilogicColor: Story = {
  name: 'archilogic color',
  render,
  args: {
    color: 'sanfran'
  }
}

export const Hex: Story = {
  name: 'hex',
  render,
  args: {
    color: '#ffc400'
  }
}

export const Rgb: Story = {
  name: 'rgb',
  render,
  args: {
    color: 'rgb(255, 20, 147)'
  }
}

export const Html: Story = {
  name: 'html',
  render,
  args: {
    color: 'mediumSlateBlue'
  }
}

export const WithBorder: Story = {
  name: 'with border',
  render,
  args: {
    color: 'white',
    borderColor: 'primary'
  }
}

export const SizeMd: Story = {
  name: 'size md',
  render,
  args: {
    color: 'primary'
  }
}

export const SizeLg: Story = {
  name: 'size lg',
  render,
  args: { size: 'lg', color: 'primary' }
}
