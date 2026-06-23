import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import AAvatar from '../components/Avatar.vue'

type AvatarArgs = ComponentProps<typeof AAvatar> & { default?: string }

const meta: Meta<AvatarArgs> = {
  title: 'Components/Avatar',
  component: AAvatar
}

export default meta

type Story = StoryObj<AvatarArgs>

const render = (args: AvatarArgs) => ({
  components: { AAvatar },
  setup() {
    return { args }
  },
  template: `
  <AAvatar v-bind="args">${args.default || ''}
  </AAvatar>`
})

export const MdSize: Story = { name: 'md size', render, args: { size: 'md' } }

export const LgSize: Story = { name: 'lg size', render, args: { size: 'lg' } }

export const WLabelProp: Story = {
  name: 'w/ label prop',
  render,
  args: {
    label: 'Ro'
  }
}

export const ContentSlot: Story = {
  name: 'content slot',
  render,
  args: {
    default: 'Ro'
  }
}
