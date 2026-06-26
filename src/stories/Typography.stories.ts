import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta = {
  title: 'Primitives/Typography'
}

export default meta

type Story = StoryObj

export const HeadingXl: Story = {
  name: 'heading-xl',
  render: () => ({
    template: `<h1 class="heading-xl">Heading extra-large</h1>`
  })
}

export const HeadingLg: Story = {
  name: 'heading-lg',
  render: () => ({
    template: `<h2 class="heading-lg">Heading large</h2>`
  })
}

export const HeadingMd: Story = {
  name: 'heading-md',
  render: () => ({
    template: `<h3 class="heading-md">Heading medium</h3>`
  })
}

export const HeadingSm: Story = {
  name: 'heading-sm',
  render: () => ({
    template: `<h4 class="heading-sm">Heading small</h4>`
  })
}

export const HeadingXs: Story = {
  name: 'heading-xs',
  render: () => ({
    template: `<h5 class="heading-xs">Heading extra-small</h5>`
  })
}

export const HeadingXxs: Story = {
  name: 'heading-xxs',
  render: () => ({
    template: `<h6 class="heading-xxs">Heading extra-extra-small</h6>`
  })
}

export const BodyLg: Story = {
  name: 'body-lg',
  render: () => ({
    template: `<p class="body-lg">Body large 400 (regular)</p>`
  })
}

export const BodyLg500: Story = {
  name: 'body-lg-500',
  render: () => ({
    template: `<p class="body-lg-500">Body large 500 (medium)</p>`
  })
}

export const BodyLg600: Story = {
  name: 'body-lg-600',
  render: () => ({
    template: `<p class="body-lg-600">Body large 600 (semi-bold)</p>`
  })
}

export const BodyMd: Story = {
  name: 'body-md',
  render: () => ({
    template: `<p class="body-md">Body medium 400 (regular)</p>`
  })
}

export const BodyMd500: Story = {
  name: 'body-md-500',
  render: () => ({
    template: `<p class="body-md-500">Body medium 500 (medium)</p>`
  })
}

export const BodyMd600: Story = {
  name: 'body-md-600',
  render: () => ({
    template: `<p class="body-md-600">Body medium 600 (semi-bold)</p>`
  })
}

export const BodySm: Story = {
  name: 'body-sm',
  render: () => ({
    template: `<p class="body-sm">Body small 400 (regular)</p>`
  })
}

export const BodySm500: Story = {
  name: 'body-sm-500',
  render: () => ({
    template: `<p class="body-sm-500">Body small 500 (medium)</p>`
  })
}

export const BodySm600: Story = {
  name: 'body-sm-600',
  render: () => ({
    template: `<p class="body-sm-600">Body small 600 (semi-bold)</p>`
  })
}

export const BodyXs: Story = {
  name: 'body-xs',
  render: () => ({
    template: `<p class="body-xs">Body x-small 400 (regular)</p>`
  })
}

export const BodyXs500: Story = {
  name: 'body-xs-500',
  render: () => ({
    template: `<p class="body-xs-500">Body x-small 500 (medium)</p>`
  })
}

export const BodyXs600: Story = {
  name: 'body-xs-600',
  render: () => ({
    template: `<p class="body-xs-600">Body x-small 600 (semi-bold)</p>`
  })
}

export const Code: Story = {
  name: 'code',
  render: () => ({
    template: `<p class="code">code snippets</p>`
  })
}
