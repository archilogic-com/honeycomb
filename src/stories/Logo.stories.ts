import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ALogo, ALogoButton } from '../components'

const meta: Meta<typeof ALogo> = {
  title: 'Components/Logo',
  component: ALogo,
  subcomponents: { ALogoButton },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', '']
    }
  }
}

export default meta

type Story = StoryObj<typeof ALogo>

const render = (args: ComponentProps<typeof ALogo>) => ({
  components: { ALogo },
  setup() {
    return { args }
  },
  template: `
  <ALogo v-bind="args">
  </ALogo>`
})

export const LogoButton: Story = {
  name: 'logo button',
  render: () => ({
    components: { ALogoButton },
    template: `<a-logo-button></a-logo-button>`
  })
}

export const LogoDefault: Story = { name: 'logo default', render }

export const LogoMarkSm: Story = {
  name: 'logo mark sm',
  render,
  args: { variant: 'mark', size: 'sm' }
}

export const LogoMarkMd: Story = {
  name: 'logo mark md',
  render,
  args: { variant: 'mark', size: 'md' }
}

export const LogoMarkLg: Story = {
  name: 'logo mark lg',
  render,
  args: { variant: 'mark', size: 'lg' }
}

export const LogoLight: Story = {
  name: 'logo light',
  render,
  args: { color: 'light' },
  decorators: [
    () => ({
      template: '<div class="bg-newyork"><story /></div>'
    })
  ]
}
