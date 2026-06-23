import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ACounter } from '../components'

type CounterArgs = ComponentProps<typeof ACounter> & {
  default?: string
  wrapperStyles?: string
}

const meta: Meta<CounterArgs> = {
  title: 'Components/Counter',
  component: ACounter,
  argTypes: {
    content: { control: 'text' },
    variant: {
      options: ['default', 'highlight'],
      control: 'radio'
    }
  }
}

export default meta

type Story = StoryObj<CounterArgs>

const render = (args: CounterArgs) => ({
  components: { ACounter },
  setup() {
    return { args }
  },
  template: `
  <div class="p-1 flex items-center" :class="args.wrapperStyles">
    <ACounter v-bind="args">${args.default || '312'}
    </ACounter>
  </div>`
})

export const Default: Story = { name: 'default', render }

export const Primary: Story = {
  name: 'primary',
  render,
  args: {
    variant: 'primary'
  }
}

export const Highlight: Story = {
  name: 'highlight',
  render,
  args: {
    variant: 'highlight',
    wrapperStyles: 'bg-newyork'
  }
}

export const Subtle: Story = {
  name: 'subtle',
  render,
  args: {
    variant: 'subtle'
  }
}

export const WContentProp: Story = {
  name: 'w/ content prop',
  render,
  args: {
    content: '312'
  }
}
