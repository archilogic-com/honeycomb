import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ASkeleton } from '../components'

type SkeletonArgs = ComponentProps<typeof ASkeleton> & { class?: string }

const meta: Meta<SkeletonArgs> = {
  title: 'Components/Skeleton',
  component: ASkeleton,
  argTypes: {
    variant: {
      control: ['line', 'block']
    },
    class: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<SkeletonArgs>

const render = (args: SkeletonArgs) => ({
  components: { ASkeleton },
  setup() {
    return { args }
  },
  template: `
  <ASkeleton v-bind="args">
  </ASkeleton>`
})

export const SkeletonLineSm: Story = {
  name: 'skeleton line sm',
  render,
  args: { class: 'h-4 w-full' }
}

export const SkeletonLineMd: Story = {
  name: 'skeleton line md',
  render,
  args: { class: 'h-6 w-3/4' }
}

export const SkeletonLineLg: Story = {
  name: 'skeleton line lg',
  render,
  args: { class: 'h-8 w-1/2' }
}

export const SkeletonLineXl: Story = {
  name: 'skeleton line xl',
  render,
  args: { class: 'h-10 w-1/4' }
}

export const SkeletonBlock: Story = {
  name: 'skeleton block ',
  render,
  args: { variant: 'block', class: 'w-[300px] h-[140px]' }
}
