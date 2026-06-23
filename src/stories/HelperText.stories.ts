import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AHelperText, AIcon } from '../components'

type HelperTextArgs = ComponentProps<typeof AHelperText> & {
  default?: string
  class?: string
}

const meta: Meta<HelperTextArgs> = {
  title: 'Components/HelperText',
  component: AHelperText,
  argTypes: {
    content: { control: 'text' },
    variant: {
      options: ['hint', 'error'],
      control: 'radio'
    }
  }
}

export default meta

type Story = StoryObj<HelperTextArgs>

const render = (args: HelperTextArgs) => ({
  components: { AHelperText, AIcon },
  setup() {
    return { args }
  },
  template: `
  <AHelperText class="mt-4" v-bind="args">${args.default || ''}
  </AHelperText>`
})

export const Hint: Story = {
  name: 'hint',
  render,
  args: {
    default: 'Please only use numbers, letters, and underscores'
  }
}

export const Error: Story = {
  name: 'error',
  render,
  args: { variant: 'error', default: 'Please only use numbers, letters, and underscores' }
}

export const WContentProp: Story = {
  name: 'w/ content prop',
  render,
  args: {
    content: 'Please only use numbers, letters, and underscores'
  }
}

export const WCustomMarkup: Story = {
  name: 'w/ custom markup',
  render,
  args: {
    default: '<a-icon size="sm" name="check" class=" mr-1"/>This is a message with a checkmark',
    class: 'w-[10rem]'
  }
}

export const HintMultiline: Story = {
  name: 'hint multiline',
  render,
  args: { default: 'Please only use numbers, letters, and underscores', class: 'w-[10rem]' }
}

export const ErrorMultiline: Story = {
  name: 'error multiline',
  render,
  args: {
    variant: 'error',
    default: 'Please only use numbers, letters, and underscores',
    class: 'w-[10rem]'
  }
}
