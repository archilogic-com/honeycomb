import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ALink } from '../components'

type LinkArgs = ComponentProps<typeof ALink> & { default?: string; href?: string }

const meta: Meta<LinkArgs> = {
  title: 'Components/Link',
  component: ALink,
  argTypes: {
    size: {
      options: ['md', 'sm'],
      control: 'radio'
    },
    variant: {
      options: ['primary', 'standard'],
      control: 'radio'
    },
    content: {
      control: 'text'
    },
    href: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<LinkArgs>

const render = (args: LinkArgs) => ({
  components: { ALink },
  setup() {
    return { args }
  },
  template: `<ALink v-bind="args">${args.default || ''}</ALink>`
})

export const ProvideHref: Story = {
  name: 'provide href',
  render,
  args: {
    default: 'Home',
    href: '/'
  }
}

export const StandardSm: Story = {
  name: 'standard sm',
  render,
  args: {
    default: 'Standard sm',
    href: '/'
  }
}

export const PrimarySm: Story = {
  name: 'primary sm',
  render,
  args: {
    variant: 'primary',
    default: 'Primary sm',
    href: '/'
  }
}

export const StandardMd: Story = {
  name: 'standard md',
  render,
  args: {
    default: 'Standard md',
    size: 'md',
    href: '/'
  }
}

export const PrimaryMd: Story = {
  name: 'primary md',
  render,
  args: {
    variant: 'primary',
    size: 'md',
    default: 'Primary md',
    href: '/'
  }
}

export const StandardWithContentProp: Story = {
  name: 'standard w/ content prop',
  render,
  args: {
    content: 'Standard',
    href: '/'
  }
}

export const PrimaryWithContentProp: Story = {
  name: 'primary w/ content prop',
  render,
  args: {
    variant: 'primary',
    content: 'Primary',
    href: '/'
  }
}

export const InlineExample: Story = {
  name: 'inline example',
  render: () => ({
    components: { ALink },
    template: `
         <p>Structural editing is a <a-link href="/">beta feature</a-link>.</p>
        `
  })
}

export const AsAButton: Story = {
  name: 'as a button',
  render,
  args: {
    default: "I'm a button that looks like a link."
  }
}
