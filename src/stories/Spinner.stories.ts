import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ASpinner } from '../components'

type SpinnerArgs = ComponentProps<typeof ASpinner>

const meta: Meta<typeof ASpinner> = {
  title: 'Components/Spinner',
  component: ASpinner,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: ['default', 'prominent']
    }
  }
}

export default meta

type Story = StoryObj<typeof ASpinner>

const render = (args: SpinnerArgs) => ({
  components: { ASpinner },
  setup() {
    return { args }
  },
  template: `
  <ASpinner v-bind="args">
  </ASpinner>`
})

export const SpinnerDefaultSm: Story = {
  name: 'spinner default sm',
  render,
  args: { size: 'sm' }
}

export const SpinnerDefaultMd: Story = {
  name: 'spinner default md',
  render,
  args: { size: 'md' }
}

export const SpinnerDefaultLg: Story = {
  name: 'spinner default lg',
  render,
  args: { size: 'lg' }
}

export const SpinnerProminentSm: Story = {
  name: 'spinner prominent sm',
  render,
  args: { variant: 'prominent', size: 'sm' }
}

export const SpinnerProminentMd: Story = {
  name: 'spinner prominent md',
  render,
  args: { variant: 'prominent', size: 'md' }
}

export const SpinnerProminentLg: Story = {
  name: 'spinner prominent lg',
  render,
  args: { variant: 'prominent', size: 'lg' }
}
