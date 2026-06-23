import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { AStatus } from '../components'

type StatusArgs = ComponentProps<typeof AStatus> & { default?: string }

const meta: Meta<StatusArgs> = {
  title: 'Components/Status',
  component: AStatus
}

export default meta

type Story = StoryObj<StatusArgs>

const render = (args: StatusArgs) => ({
  components: { AStatus },
  setup() {
    return { args }
  },
  template: `
  <AStatus v-bind="args">${args.default || ''}
  </AStatus>`
})

export const Neutral: Story = {
  name: 'neutral',
  render,
  args: {
    default: 'pending'
  }
}

export const Primary: Story = {
  name: 'primary',
  render,
  args: {
    variant: 'primary',
    default: 'pro'
  }
}

export const Success: Story = {
  name: 'success',
  render,
  args: {
    default: 'completed',
    variant: 'success'
  }
}

export const Danger: Story = {
  name: 'danger',
  render,
  args: {
    default: 'rejected',
    variant: 'danger'
  }
}

export const WContentProp: Story = {
  name: 'w/ content prop',
  render,
  args: {
    content: 'in progress'
  }
}
